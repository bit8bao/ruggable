/* eslint-disable */
import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { getBy } from '../utils';

const propTypes = {
  // General
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Cell: PropTypes.any,
      Header: PropTypes.any,
    })
  ),
};

export const useColumns = (props: any) => {
  const {
    debug,
    columns: userColumns,
    state: [{ groupBy }],
  } = props;

  PropTypes.checkPropTypes(propTypes, props, 'property', 'useColumns');

  const { columns, headerGroups, headers } = useMemo(() => {
    if (debug) {
      console.info('getColumns');
    }

    // Decorate All the columns
    const columnTree: any = decorateColumnTree(userColumns, undefined);

    // Get the flat list of all columns
    let columns1: any = flattenBy(columnTree, 'columns');

    columns1 = [...groupBy.map((g: any) => columns1.find((col: any) => col.id === g)), ...columns1.filter((col: any) => !groupBy.includes(col.id))];

    // Get headerGroups
    const headerGroups1: any = makeHeaderGroups(columns1, findMaxDepth(columnTree));
    const headers1: any = flattenBy(headerGroups1, 'headers');

    return {
      columns: columns1,
      headerGroups: headerGroups1,
      headers: headers1,
    };
  }, [groupBy, userColumns]);

  return {
    ...props,
    columns,
    headerGroups,
    headers,
  };

  // Find the depth of the columns
  function findMaxDepth(columns: any, depth: any = 0) {
    return columns.reduce((prev: any, curr: any) => {
      if (curr.columns) {
        return Math.max(prev, findMaxDepth(curr.columns, depth + 1));
      }

      return depth;
    }, 0);
  }

  function decorateColumn(column: any, parent: any) {
    // First check for string accessor
    let { id, accessor, Header } = column;

    if (typeof accessor === 'string') {
      id = id || accessor;
      const accessorString: any = accessor;
      accessor = (row: any) => getBy(row, accessorString, undefined);
    }

    if (!id && typeof Header === 'string') {
      id = Header;
    }

    if (!id) {
      // Accessor, but no column id? This is bad.
      console.error(column);
      throw new Error('A column id is required!');
    }

    return {
      Header: '',
      Cell: (cell: any) => cell.value,
      show: true,
      ...column,
      id,
      accessor,
      parent,
    };
  }

  // Build the visible columns, headers and flat column list
  function decorateColumnTree(columns: any, parent: any, depth: any = 0) {
    return columns.map((column: any) => {
      column = decorateColumn(column, parent);
      if (column.columns) {
        column.columns = decorateColumnTree(column.columns, column, depth + 1);
      }

      return column;
    });
  }

  function flattenBy(columns: any, childKey: any) {
    const flatColumns: any[] = [];

    const recurse = (columns: any) => {
      columns.forEach((d: any) => {
        if (!d[childKey]) {
          flatColumns.push(d);
        } else {
          recurse(d[childKey]);
        }
      });
    };

    recurse(columns);

    return flatColumns;
  }

  // Build the header groups from the bottom up
  function makeHeaderGroups(columns: any, maxDepth: any) {
    const headerGroups: any[] = [];

    const removeChildColumns = (column: any) => {
      delete column.columns;
      if (column.parent) {
        removeChildColumns(column.parent);
      }
    };
    columns.forEach(removeChildColumns);

    const buildGroup = (columns1: any, depth: any = 0) => {
      const headerGroup: any = {
        headers: [],
      };

      const parentColumns: any[] = [];

      const hasParents: any = columns1.some((col: any) => col.parent);

      columns1.forEach((column: any) => {
        const isFirst = !parentColumns.length;
        let latestParentColumn = [...parentColumns].reverse()[0];

        // If the column has a parent, add it if necessary
        if (column.parent) {
          if (isFirst || latestParentColumn.originalID !== column.parent.id) {
            parentColumns.push({
              ...column.parent,
              originalID: column.parent.id,
              id: [column.parent.id, parentColumns.length].join('_'),
            });
          }
        } else if (hasParents) {
          // If other columns have parents, add a place holder if necessary
          const placeholderColumn = decorateColumn(
            {
              originalID: [column.id, 'placeholder', maxDepth - depth].join('_'),
              id: [column.id, 'placeholder', maxDepth - depth, parentColumns.length].join('_'),
            },
            undefined
          );
          if (isFirst || latestParentColumn.originalID !== placeholderColumn.originalID) {
            parentColumns.push(placeholderColumn);
          }
        }

        // Establish the new columns[] relationship on the parent
        if (column.parent || hasParents) {
          latestParentColumn = [...parentColumns].reverse()[0];
          latestParentColumn.columns = latestParentColumn.columns || [];
          if (!latestParentColumn.columns.includes(column)) {
            latestParentColumn.columns.push(column);
          }
        }

        headerGroup.headers.push(column);
      });

      headerGroups.push(headerGroup);

      if (parentColumns.length) {
        buildGroup(parentColumns);
      }
    };

    buildGroup(columns);

    return headerGroups.reverse();
  }
};
