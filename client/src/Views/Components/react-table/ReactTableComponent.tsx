/* eslint-disable */
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTable, useColumns, useRows, useGroupBy, useFilters, useSortBy, useExpanded, usePagination, useFlexLayout } from './react-table';

import {
  TableStyle,
  RowStyle,
  HeaderRowStyle,
  HeaderStyle,
  CellStyle,
  PaginationPageIndicator,
  PaginationWrapper,
  TableBody,
} from './components/StyledComponents';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './reactTableTheming';
import Pagination from '../Tables/CommonComponents/Pagination/Pagination';
import PaginationEnum from '../Tables/CommonComponents/Pagination/PaginationEnum';
import IPaginateState from '../Tables/CommonComponents/Pagination/IPaginateState';

/*
 * Code from react table 7 - https://github.com/tannerlinsley/react-table
 * https://codesandbox.io/s/m5lxzzpz69
 */

export interface IReactTableRow<T, V = unknown> {
  readonly cells: unknown[];
  readonly getRowProps: () => unknown;
  readonly index: number;
  readonly isExpanded: unknown;
  readonly original: T;
  readonly path: unknown;
  readonly subRows: unknown;
  readonly value: V;
}

// TODO: Figure out what the types are for ReactTable Version 7
// This is from Version 6 https://github.com/tannerlinsley/react-table/tree/v6#columns
export interface IReactTableColumn {
  // Renderers - For more information, see "Renderers" section below
  Cell?: JSX.Element | string | Function; // Used to render a standard cell, defaults to the accessed value
  Header?: JSX.Element | string | Function; // Used to render the header of a column or column group
  Footer?: JSX.Element | string | Function; // Used to render the footer of a column
  // General
  accessor?: string; // or Accessor eg. (row) => row.propertyName (see "Accessors" section for more details)
  id: string; // Conditional - A unique ID is required if the accessor is not a string or if you would like to override the column name used in server-side calls
  width?: number; // A hardcoded width for the column. This overrides both min and max width options
  minWidth?: number; // A minimum width for this column. If there is extra room column will flex to fill available space (up to the max-width, if set)
  maxWidth?: number; // A maximum width for this column.
  sortMethod?: Function;

  // Cell Options
  headerStyle?: {};
}

const useInfiniteScroll = ({ enabled, sortBy, groupBy, filters, pageIndex, pageSize }: any) => {
  const listRef = useRef(null);
  const [scrollToIndex, setScrollToIndex] = useState(0);
  const [rowHeight, setRowHeight] = useState(40);
  const [height, setHeight] = useState(500);
  const [overscan, setOverscan] = useState(25);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    if (listRef.current) {
      (listRef.current as any).scrollToItem(scrollToIndex, 'start');
    }
  }, [scrollToIndex]);

  // useEffect(() => {}, []);

  useLayoutEffect(() => {
    if (!enabled) {
      return;
    }
    if (listRef.current) {
      (listRef.current as any).scrollToItem(0, 'start');
    }
  }, [sortBy, groupBy, filters]);

  return {
    listRef,
    scrollToIndex,
    setScrollToIndex,
    rowHeight,
    setRowHeight,
    height,
    setHeight,
    overscan,
    setOverscan,
  };
};

/*
 * Code from react table 7 - https://github.com/tannerlinsley/react-table
 * https://codesandbox.io/s/m5lxzzpz69
 */
export default function ReactTableComponent({
  numberOfRows,
  sortFlag,
  initialPage,
  onPaginationChange,
  apiPaginationTotalResults,
  apiPaginationUnknown,
  showPagination,
  dataAutomation,
  styleTheme = defaultTheme,
  ...props
}: any) {
  const infinite: boolean = Boolean(apiPaginationUnknown);
  const paginationShow: boolean = showPagination && !infinite;
  const {
    getTableProps,
    headerGroups,
    rows,
    getRowProps,
    pageOptions,
    page,
    state: [{ pageIndex, pageSize, sortBy, groupBy, filters }],
    gotoPage,
    prepareRow,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      ...props,
    },
    useColumns,
    useRows,
    useGroupBy,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useFlexLayout
  );

  const { listRef, scrollToIndex, setScrollToIndex, rowHeight, setRowHeight, height, setHeight, overscan, setOverscan } = useInfiniteScroll({
    enabled: infinite,
    sortBy,
    groupBy,
    filters,
    pageIndex,
    pageSize,
  });

  useEffect(() => {
    setPageSize(numberOfRows);
    setRowHeight(60);
  }, [numberOfRows]);

  let tableBody: any;

  const renderRow = (row: any, rowIndex: number, style: any = {}) => {
    prepareRow(row);

    return (
      <RowStyle {...row.getRowProps({ style, even: rowIndex % 2 })} data-automation={`${dataAutomation}-ReactTableComponent_row_${rowIndex}`}>
        {row.cells.map((cell: any, rowColumnIndex: any) => {
          const cellContent: string | JSX.Element = cell.render('Cell');

          return (
            <CellStyle
              key={`ReactTableComponent_row_${rowColumnIndex}`}
              data-automation={`${dataAutomation}-ReactTableComponent_row_${rowIndex}_column_${rowColumnIndex}`}
              {...cell.getCellProps()}
            >
              {cellContent}
            </CellStyle>
          );
        })}
      </RowStyle>
    );
  };

  if (infinite) {
    tableBody = (
      <InfiniteScroll loader={<div />} dataLength={rows.length} next={apiPaginationUnknown.onLoadMore} hasMore={true} height={height}>
        {rows.map((row: any, i: number) => renderRow(row, i))}
      </InfiniteScroll>
    );
  } else {
    tableBody = page && page.length ? page.map((row: any, index: number) => renderRow(row, index)) : null;
  }

  const [localPaginateState, setLocalPaginateState] = useState<IPaginateState>({
    pageCurrent: 1,
  } as any);

  const onChangePaginationHandler = (paginateState: IPaginateState) => {
    if(sortFlag){
      setLocalPaginateState(initialPage);
      onPaginationChange({...initialPage});
    }

    if (onPaginationChange) {
      setLocalPaginateState(paginateState);
      onPaginationChange(paginateState);
    }

    // If apiPaginationTotalResults has a count.
    // We assume that the table is driven by the api pagination
    // so we prevent the table pagination below from working.
    if (apiPaginationTotalResults > 0) {
      return;
    }

    switch (paginateState.type) {
      case PaginationEnum.FirstPage:
        gotoPage(0);

        return;
      case PaginationEnum.PreviousPage:
        previousPage();

        return;
      case PaginationEnum.CurrentPage:
        gotoPage(paginateState.pageCurrent - 1);

        return;
      case PaginationEnum.NextPage:
        nextPage();

        return;
      case PaginationEnum.LastPage:
        gotoPage(paginateState.pageEnd - 1);

        return;
    }
  };

  return (
    <ThemeProvider theme={styleTheme}>
      <TableStyle {...getTableProps()} data-automation={`${dataAutomation}-ReactTableComponent`}>
        {headerGroups.map((headerGroup: any, index: number) => (
          <HeaderRowStyle key={`headerRow${index}`} {...headerGroup.getRowProps()} data-automation={`${dataAutomation}-ReactTableComponent_header`}>
            {headerGroup.headers.map((column: any, headerIndex: number) => {
              const toggleProps = column.getSortByToggleProps();
              const newToggleProps = {
                ...toggleProps,
                style: {
                  ...toggleProps.style,
                  width: '100%',
                  ...column.headerStyle,
                },
              };

              let columned = column;
                columned = {
                  ...column,
                  sortedDesc: undefined,
                  sortedIndex: 0,
                };

                //console.log(column);

              return (
                <HeaderStyle
                  data-automation={`${dataAutomation}-ReactTableComponent_header_column_${headerIndex}`}
                  key={`header_${headerIndex}`}
                  {...column.getHeaderProps()}
                  sorted={column.sorted}
                  sortedDesc={columned.sortedDesc}
                  sortedIndex={columned.sortedIndex}
                >
                  <div {...newToggleProps}>{column.render('Header')}</div>
                </HeaderStyle>
              );
            })}
          </HeaderRowStyle>
        ))}
        <TableBody data-automation={`${dataAutomation}-ReactTableComponent_body`}>
          {tableBody}
        </TableBody>
        {paginationShow && (
          <PaginationWrapper data-automation={`${dataAutomation}-ReactTableComponent_paginationWrapper`}>
            <PaginationPageIndicator data-automation={`${dataAutomation}-ReactTableComponent_paginationPageIndicator`}>
              Showing {localPaginateState.itemsStart} - {localPaginateState.itemsEnd} out of{' '}
              {apiPaginationTotalResults ? apiPaginationTotalResults : rows.length} Entries
            </PaginationPageIndicator>
            <Pagination
              dataAutomation={`${dataAutomation}-ReactTableComponent`}
              items={rows}
              onChangePagination={onChangePaginationHandler}
              numberOfRows={numberOfRows}
              apiPaginationTotalResults={apiPaginationTotalResults}
            />
          </PaginationWrapper>
        )}
      </TableStyle>
    </ThemeProvider>
  );
}
