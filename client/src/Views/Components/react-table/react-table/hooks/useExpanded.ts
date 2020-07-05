/* eslint-disable */
import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { getBy, getFirstDefined, setBy } from '../utils';
import { addActions, actions } from '../actions';
import { defaultState } from './useTableState';

defaultState.expanded = {};

addActions({
  toggleExpanded: '__toggleExpanded__',
  useExpanded: '__useExpanded__',
});

const propTypes = {
  expandedKey: PropTypes.string,
};

export const useExpanded = (props: any) => {
  PropTypes.checkPropTypes(propTypes, props, 'property', 'useExpanded');

  const {
    debug,
    columns,
    rows,
    expandedKey = 'expanded',
    hooks,
    state: [{ expanded }, setState],
  } = props;

  const toggleExpandedByPath = (path: any, set: any) => {
    return setState((old: any) => {
      const { expanded } = old;
      const existing = getBy(expanded, path, undefined);
      set = getFirstDefined(set, !existing);

      return {
        ...old,
        expanded: setBy(expanded, path, set),
      };
    }, actions.toggleExpanded);
  };

  hooks.row.push((row: any) => {
    const { path } = row;
    row.toggleExpanded = (set: any) => toggleExpandedByPath(path, set);
  });

  const expandedRows = useMemo(() => {
    if (debug) {
      console.info('getExpandedRows');
    }

    const expandedRows1: any[] = [];

    // Here we do some mutation, but it's the last stage in the
    // immutable process so this is safe
    const handleRow = (row: any, index: any, depth: number = 0, parentPath: any[] = []) => {
      // Compute some final state for the row
      const path: any[] = [...parentPath, index];

      row.path = path;
      row.depth = depth;

      row.isExpanded = (row.original && row.original[expandedKey]) || getBy(expanded, path, undefined);

      row.cells = columns.map((column: any) => {
        const cell: any = {
          column,
          row,
          state: null,
          value: row.values[column.id],
        };

        return cell;
      });

      expandedRows1.push(row);

      if (row.isExpanded && row.subRows && row.subRows.length) {
        row.subRows.forEach((subRow: any, i: number) => handleRow(subRow, i, depth + 1, path));
      }
    };

    rows.forEach((row: any, i: number) => handleRow(row, i));

    return expandedRows1;
  }, [rows, expanded, columns]);

  const expandedDepth = findExpandedDepth(expanded);

  return {
    ...props,
    toggleExpandedByPath,
    expandedDepth,
    rows: expandedRows,
  };
};

function findExpandedDepth(obj: any, depth: any = 1): any {
  return Object.values(obj).reduce((prev: any, curr: any) => {
    if (typeof curr === 'object') {
      return Math.max(prev, findExpandedDepth(curr, depth + 1));
    }

    return depth;
  }, 0);
}
