/* eslint-disable */
import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { addActions, actions } from '../actions';
import { defaultState } from './useTableState';
import { mergeProps, applyPropHooks, getFirstDefined, defaultOrderByFn, defaultSortByFn } from '../utils';

defaultState.sortBy = [];

addActions({
  sortByChange: '__sortByChange__',
});

const propTypes: any = {
  // General
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      sortByFn: PropTypes.func,
      efaultSortDesc: PropTypes.bool,
    })
  ),
  sortByFn: PropTypes.func,
  manualSorting: PropTypes.bool,
  disableSorting: PropTypes.bool,
  defaultSortDesc: PropTypes.bool,
  disableMultiSort: PropTypes.bool,
};

export const useSortBy = (props: any) => {
  PropTypes.checkPropTypes(propTypes, props, 'property', 'useSortBy');

  const {
    debug,
    rows,
    columns,
    orderByFn = defaultOrderByFn,
    sortByFn = defaultSortByFn,
    manualSorting,
    disableSorting,
    defaultSortDesc,
    hooks,
    state: [{ sortBy }, setState],
  } = props;

  columns.forEach((column: any) => {
    const { accessor, canSortBy } = column;
    column.canSortBy = accessor ? getFirstDefined(canSortBy, disableSorting === true ? false : undefined, true) : false;
  });

  // Updates sorting based on a columnID, desc flag and multi flag
  const toggleSortByID = (columnID: any, desc: any, multi: number) => {
    return setState((old: any) => {
      const { sortBy } = old;

      // Find the column for this columnID
      const column: any = columns.find((d: any) => d.id === columnID);
      const resolvedDefaultSortDesc: any = getFirstDefined(column.defaultSortDesc, defaultSortDesc);

      // Find any existing sortBy for this column
      const existingSortBy: any = sortBy.find((d: any) => d.id === columnID);
      const hasDescDefined: any = typeof desc !== 'undefined' && desc !== null;

      let newSortBy: any[] = [];

      // What should we do with this filter?
      let action: any;

      if (!multi) {
        if (sortBy.length <= 1 && existingSortBy) {
          if (existingSortBy.desc) {
            action = 'remove';
          } else {
            action = 'toggle';
          }
        } else {
          action = 'replace';
        }
      } else {
        if (!existingSortBy) {
          action = 'add';
        } else {
          if (hasDescDefined) {
            action = 'set';
          } else {
            action = 'toggle';
          }
        }
      }

      if (action === 'replace') {
        newSortBy = [
          {
            id: columnID,
            desc: hasDescDefined ? desc : resolvedDefaultSortDesc,
          },
        ];
      } else if (action === 'add') {
        newSortBy = [
          ...sortBy,
          {
            id: columnID,
            desc: hasDescDefined ? desc : resolvedDefaultSortDesc,
          },
        ];
      } else if (action === 'set') {
        newSortBy = sortBy.map((d: any) => {
          if (d.id === columnID) {
            return {
              ...d,
              desc,
            };
          }

          return d;
        });
      } else if (action === 'toggle') {
        newSortBy = sortBy.map((d: any) => {
          if (d.id === columnID) {
            return {
              ...d,
              desc: !existingSortBy.desc,
            };
          }

          return d;
        });
      } else if (action === 'remove') {
        newSortBy = [];
      }

      return {
        ...old,
        sortBy: newSortBy,
      };
    }, actions.sortByChange);
  };

  hooks.columns.push((columns1: any) => {
    columns1.forEach((column: any) => {
      if (column.canSortBy) {
        column.toggleSortBy = (desc: any, multi: number) => toggleSortByID(column.id, desc, multi);
      }
    });

    return columns1;
  });

  hooks.getSortByToggleProps = [];

  const addSortByToggleProps = (columns: any, api: any) => {
    columns.forEach((column: any) => {
      const { canSortBy } = column;
      column.getSortByToggleProps = (props: any) => {
        return mergeProps(
          {
            onClick: canSortBy
              ? (e: any) => {
                  e.persist();
                  column.toggleSortBy(undefined, !api.disableMultiSort && e.shiftKey);
                }
              : undefined,
            style: {
              cursor: canSortBy ? 'pointer' : undefined,
            },
            title: 'Toggle SortBy',
          },
          applyPropHooks(api.hooks.getSortByToggleProps, column, api),
          props
        );
      };
    });

    return columns;
  };

  hooks.columns.push(addSortByToggleProps);
  hooks.headers.push(addSortByToggleProps);

  // Mutate columns to reflect sorting state
  columns.forEach((column: any) => {
    const { id } = column;
    column.sorted = sortBy.find((d: any) => d.id === id);
    column.sortedIndex = sortBy.findIndex((d: any) => d.id === id);
    column.sortedDesc = column.sorted ? column.sorted.desc : undefined;
  });

  const sortedRows = useMemo(() => {
    if (manualSorting || !sortBy.length) {
      return rows;
    }
    if (debug) {
      console.info('getSortedRows');
    }

    const sortMethodsByColumnID = {};

    columns
      .filter((col: any) => col.sortMethod)
      .forEach((col: any) => {
        sortMethodsByColumnID[col.id] = col.sortMethod;
      });

    const sortData = (rows: any) => {
      // Use the orderByFn to compose multiple sortBy's together.
      // This will also perform a stable sorting using the row index
      // if needed.
      const sortedData = orderByFn(
        rows,
        sortBy.map((sort: any) => {
          // Support custom sorting methods for each column
          const columnSortBy = sortMethodsByColumnID[sort.id];

          // Return the correct sortFn
          return (a: any, b: any) => (columnSortBy || sortByFn)(a.values[sort.id], b.values[sort.id], sort.desc);
        }),
        // Map the directions
        sortBy.map((d: any) => !d.desc)
      );

      // TODO: this should be optimized. Not good to loop again
      sortedData.forEach((row: any) => {
        if (!row.subRows) {
          return;
        }
        row.subRows = sortData(row.subRows);
      });

      return sortedData;
    };

    return sortData(rows);
  }, [rows, columns, sortBy, manualSorting]);

  return {
    ...props,
    rows: sortedRows,
  };
};
