/* eslint-disable */
import PropTypes from 'prop-types';
//
import { flexRender, applyHooks, applyPropHooks, mergeProps } from '../utils';

import { useTableState } from './useTableState';

const renderErr: string =
  'You must specify a render "type". This could be "HeaderStyle", "Filter", or any other custom renderers you have set on your column.';

const propTypes: any = {
  // General
  data: PropTypes.array.isRequired,
  debug: PropTypes.bool,
};

export const useTable = (props: any, ...plugins: any) => {
  // Validate props
  PropTypes.checkPropTypes(propTypes, props, 'property', 'useTable');

  // Destructure props
  let { data = [], state: userState, debug } = props;

  debug = process.env.NODE_ENV === 'production' ? false : debug;

  // Always provide a default state
  const defaultState = useTableState();

  // But use the users state if provided
  const state = userState || defaultState;

  // These are hooks that plugins can use right before render
  const hooks: any = {
    beforeRender: [],
    columns: [],
    headers: [],
    headerGroups: [],
    rows: [],
    row: [],
    renderableRows: [],
    getTableProps: [],
    getRowProps: [],
    getHeaderRowProps: [],
    getHeaderProps: [],
    getCellProps: [],
  };

  // The initial api
  let api: any = {
    ...props,
    data,
    state,
    hooks,
  };

  if (debug) {
    console.time('hooks');
  }
  // Loop through plugins to build the api out
  api = plugins.filter(Boolean).reduce((prev: any, next: any) => next(prev), api);
  if (debug) {
    console.timeEnd('hooks');
  }

  // Run the beforeRender hook
  if (debug) {
    console.time('hooks.beforeRender');
  }
  applyHooks(api.hooks.beforeRender, undefined, api);
  if (debug) {
    console.timeEnd('hooks.beforeRender');
  }

  if (debug) {
    console.time('hooks.columns');
  }
  api.columns = applyHooks(api.hooks.columns, api.columns, api);
  if (debug) {
    console.timeEnd('hooks.columns');
  }

  if (debug) {
    console.time('hooks.headers');
  }
  api.headers = applyHooks(api.hooks.headers, api.headers, api);
  if (debug) {
    console.timeEnd('hooks.headers');
  }
  [...api.columns, ...api.headers].forEach((column: any) => {
    // Give columns/headers rendering power
    column.render = (type: any, userProps: any = {}) => {
      if (!type) {
        throw new Error(renderErr);
      }

      return flexRender(column[type], {
        ...api,
        ...column,
        ...userProps,
      });
    };

    // Give columns/headers getHeaderProps
    column.getHeaderProps = (props: any) =>
      mergeProps(
        {
          key: ['header', column.id].join('_'),
        },
        applyPropHooks(api.hooks.getHeaderProps, column, api),
        props
      );
  });

  if (debug) {
    console.time('hooks.headerGroups');
  }
  api.headerGroups = applyHooks(api.hooks.headerGroups, api.headerGroups, api).filter((headerGroup: any, i: number) => {
    // Filter out any headers and headerGroups that don't have visible columns
    headerGroup.headers = headerGroup.headers.filter((header: any) => {
      const recurse = (columns: any) =>
        columns.filter((column: any) => {
          if (column.columns) {
            return recurse(column.columns);
          }

          return column.visible;
        }).length;
      if (header.columns) {
        return recurse(header.columns);
      }

      return header.visible;
    });

    // Give headerGroups getRowProps
    if (headerGroup.headers.length) {
      headerGroup.getRowProps = (props: any = {}) =>
        mergeProps(
          {
            key: [`header${i}`].join('_'),
          },
          applyPropHooks(api.hooks.getHeaderRowProps, headerGroup, api),
          props
        );

      return true;
    }

    return false;
  });
  if (debug) {
    console.timeEnd('hooks.headerGroups');
  }

  // Run the rows (this could be a dangerous hook with a ton of data)
  if (debug) {
    console.time('hooks.rows');
  }
  api.rows = applyHooks(api.hooks.rows, api.rows, api);
  if (debug) {
    console.timeEnd('hooks.rows');
  }

  // This function is absolutely necessary and MUST be called on
  // any rows the user wishes to be displayed.
  api.prepareRow = (row: any) => {
    const { index } = row;
    row.getRowProps = (props: any) => mergeProps({ key: ['row', index].join('_') }, applyHooks(api.hooks.getRowProps, row, api), props);

    row.cells = row.cells.filter((cell: any) => cell.column.visible);

    row.cells.forEach((cell: any) => {
      if (!cell) {
        return;
      }

      const { column } = cell;

      cell.getCellProps = (props: any) => {
        const columnPathStr = [index, column.id].join('_');

        return mergeProps(
          {
            key: ['cell', columnPathStr].join('_'),
          },
          applyPropHooks(api.hooks.getCellProps, cell, api),
          props
        );
      };

      cell.render = (type: any, userProps: any = {}) => {
        if (!type) {
          throw new Error(
            'You must specify a render "type". This could be "CellStyle", "HeaderStyle", "Filter", "Aggregated" or any other custom renderers you have set on your column.'
          );
        }

        return flexRender(column[type], {
          ...api,
          ...cell,
          ...userProps,
        });
      };
    });
  };

  api.getTableProps = (userProps: any) => mergeProps(applyPropHooks(api.hooks.getTableProps, api), userProps);

  api.getRowProps = (userProps: any) => mergeProps(applyPropHooks(api.hooks.getRowProps, api), userProps);

  return api;
};
