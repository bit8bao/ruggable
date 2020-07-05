/* eslint-disable */
import { useMemo } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  subRowsKey: PropTypes.string,
};

export const useRows = (props: any) => {
  PropTypes.checkPropTypes(propTypes, props, 'property', 'useRows');

  const { debug, columns, subRowsKey = 'subRows', data } = props;

  const accessedRows = useMemo(() => {
    if (debug) {
      console.info('getAccessedRows');
    }

    // Access the row's data
    const accessRow = (originalRow: any, index: number, depth: number = 0) => {
      // Keep the original reference around
      const original: any = originalRow;

      // Process any subRows
      const subRows: any = originalRow[subRowsKey] ? originalRow[subRowsKey].map((d: any, i: number) => accessRow(d, i, depth + 1)) : undefined;

      const row: any = {
        original,
        index,
        subRows,
        depth,
        values: {},
      };

      // Create the cells and values
      columns.forEach((column: any) => {
        row.values[column.id] = column.accessor ? column.accessor(originalRow, index, { subRows, depth, data }) : undefined;
      });

      return row;
    };

    // Use the resolved data
    return data.map((d: any, i: number) => accessRow(d, i));
  }, [data, columns]);

  return {
    ...props,
    rows: accessedRows,
  };
};
