/* eslint-disable */
import { useMemo, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

//
import { addActions, actions } from '../actions';
import { defaultState } from './useTableState';

defaultState.pageSize = 10;
defaultState.pageIndex = 0;

addActions({
  pageChange: '__pageChange__',
});

const propTypes = {
  // General
  manualPagination: PropTypes.bool,
};

export const usePagination = (props: any) => {
  PropTypes.checkPropTypes(propTypes, props, 'property', 'usePagination');

  const {
    rows,
    manualPagination,
    debug,
    state: [{ pageSize, pageIndex, pageCount: userPageCount, filters, groupBy, sortBy }, setState],
  } = props;

  useLayoutEffect(() => {
    setState(
      (old: any) => ({
        ...old,
        pageIndex: 0,
      }),
      actions.pageChange
    );
  }, [filters, groupBy, sortBy]);

  const { pages, pageCount } = useMemo(() => {
    if (manualPagination) {
      return {
        pages: [rows],
        pageCount: userPageCount,
      };
    }
    if (debug) {
      console.info('getPages');
    }

    // Create a new pages with the first page ready to go.
    const pages: any = rows.length ? [] : [[]];

    // Start the pageIndex and currentPage cursors
    let cursor: any = 0;
    while (cursor < rows.length) {
      const end = cursor + pageSize;
      pages.push(rows.slice(cursor, end));
      cursor = end;
    }

    const pageCount: any = pages.length;

    return {
      pages,
      pageCount,
    };
  }, [rows, pageSize, userPageCount]);

  const pageOptions: any = [...new Array(pageCount)].map((d: any, i: number) => i);
  const page: any = manualPagination ? rows : pages[pageIndex] || [];
  const canPreviousPage: any = pageIndex > 0;
  const canNextPage: any = pageIndex < pageCount - 1;

  const gotoPage = (pageIndex: any) => {
    if (debug) {
      console.info('gotoPage');
    }

    return setState((old: any) => {
      if (pageIndex < 0 || pageIndex > pageCount - 1) {
        return old;
      }

      return {
        ...old,
        pageIndex,
      };
    }, actions.pageChange);
  };

  const previousPage = () => {
    return gotoPage(pageIndex - 1);
  };

  const nextPage = () => {
    return gotoPage(pageIndex + 1);
  };

  const setPageSize = (pageSize: any) => {
    setState((old: any) => {
      const topRowIndex: any = old.pageSize * old.pageIndex;
      const pageIndex: any = Math.floor(topRowIndex / pageSize);

      return {
        ...old,
        pageIndex,
        pageSize,
      };
    }, actions.setPageSize);
  };

  return {
    ...props,
    pages,
    pageOptions,
    page,
    canPreviousPage,
    canNextPage,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
  };
};
