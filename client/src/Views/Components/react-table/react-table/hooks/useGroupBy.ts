/* eslint-disable */
import { useMemo } from 'react';
import PropTypes from 'prop-types';

import * as aggregations from '../aggregations';
import { addActions, actions } from '../actions';
import { defaultState } from './useTableState';
import { mergeProps, applyPropHooks, defaultGroupByFn, getFirstDefined } from '../utils';

defaultState.groupBy = [];

addActions({
  toggleGroupBy: '__toggleGroupBy__',
});

const propTypes = {
  // General
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      aggregate: PropTypes.func,
      canGroupBy: PropTypes.bool,
      Aggregated: PropTypes.any,
    })
  ),
  groupByFn: PropTypes.func,
  manualGrouping: PropTypes.bool,
  aggregations: PropTypes.object,
};

export const useGroupBy = (props: any) => {
  PropTypes.checkPropTypes(propTypes, props, 'property', 'useGroupBy');

  const {
    debug,
    rows,
    columns,
    groupByFn = defaultGroupByFn,
    manualGroupBy,
    disableGrouping,
    aggregations: userAggregations = {},
    hooks,
    state: [{ groupBy }, setState],
  } = props;

  columns.forEach((column: any) => {
    const { id, accessor, canGroupBy } = column;
    column.grouped = groupBy.includes(id);

    column.canGroupBy = accessor ? getFirstDefined(canGroupBy, disableGrouping === true ? false : undefined, true) : false;

    column.Aggregated = column.Aggregated || column.Cell;
  });

  const set: any = undefined;
  const toggleGroupBy = (id: any, toggle: any) => {
    return setState((old: any) => {
      const resolvedToggle = typeof set !== 'undefined' ? toggle : !groupBy.includes(id);
      if (resolvedToggle) {
        return {
          ...old,
          groupBy: [...groupBy, id],
        };
      }

      return {
        ...old,
        groupBy: groupBy.filter((d: any) => d !== id),
      };
    }, actions.toggleGroupBy);
  };

  hooks.columns.push((columns: any) => {
    columns.forEach((column: any) => {
      if (column.canGroupBy) {
        column.toggleGroupBy = () => toggleGroupBy(column.id, undefined);
      }
    });

    return columns;
  });

  hooks.getGroupByToggleProps = [];

  const addGroupByToggleProps = (columns: any, api: any) => {
    columns.forEach((column: any) => {
      const { canGroupBy } = column;
      column.getGroupByToggleProps = (props: any) => {
        return mergeProps(
          {
            onClick: canGroupBy
              ? (e: any) => {
                  e.persist();
                  column.toggleGroupBy();
                }
              : undefined,
            style: {
              cursor: canGroupBy ? 'pointer' : undefined,
            },
            title: 'Toggle GroupBy',
          },
          applyPropHooks(api.hooks.getGroupByToggleProps, column, api),
          props
        );
      };
    });

    return columns;
  };

  hooks.columns.push(addGroupByToggleProps);
  hooks.headers.push(addGroupByToggleProps);

  const groupedRows = useMemo(() => {
    if (manualGroupBy || !groupBy.length) {
      return rows;
    }
    if (debug) {
      console.info('getGroupedRows');
    }
    // Find the columns that can or are aggregating

    // Uses each column to aggregate rows into a single value
    const aggregateRowsToValues = (rows: any) => {
      const values = {};
      columns.forEach((column: any) => {
        const columnValues = rows.map((d: any) => d.values[column.id]);
        const aggregate = userAggregations[column.aggregate] || aggregations[column.aggregate] || column.aggregate;
        if (typeof aggregate === 'function') {
          values[column.id] = aggregate(columnValues, rows);
        } else if (aggregate) {
          throw new Error(`Invalid aggregate "${aggregate}" passed to column with ID: "${column.id}"`);
        } else {
          values[column.id] = columnValues[0];
        }
      });

      return values;
    };

    // Recursively group the data
    const groupRecursively = (rows: any, groupBy: any, depth: any = 0) => {
      // This is the last level, just return the rows
      if (depth >= groupBy.length) {
        return rows;
      }

      // Group the rows together for this level
      const groupedRows: any = Object.entries(groupByFn(rows, groupBy[depth])).map(([groupByVal, subRows], index) => {
        // Recurse to sub rows before aggregation
        subRows = groupRecursively(subRows, groupBy, depth + 1);

        const values: any = aggregateRowsToValues(subRows);

        const row: any = {
          groupByID: groupBy[depth],
          groupByVal,
          values,
          subRows,
          depth,
          index,
        };

        return row;
      });

      return groupedRows;
    };

    // Assign the new data
    return groupRecursively(rows, groupBy);
  }, [rows, groupBy, columns, manualGroupBy]);

  return {
    ...props,
    rows: groupedRows,
  };
};
