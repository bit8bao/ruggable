import styles from './Pagination.module.scss';

import React from 'react';
import paginate from 'jw-paginate';
import PaginationEnum from './PaginationEnum';
import IJwPaginate from './IJwPaginate';
import IPaginateState from './IPaginateState';
import classNames from 'classnames';
import IStore from '../../../../../Models/IStore';
import {ReduxProps} from '../../../../../Models/ReduxProps';
import {connect} from 'react-redux';
import TableAction from '../../../../../Stores/Table/TableAction';
import environment from "environment";

interface IProps {
  readonly items: any[];
  readonly apiPaginationTotalResults: number | null;
  readonly onChangePagination: (paginateState: IPaginateState) => void;
  readonly dataAutomation: string;
  readonly numberOfRows?: number;
}
interface IState {
  readonly pager: IJwPaginate;
}

interface IStateToProps {
  readonly sortFlag: boolean;
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  sortFlag: state.table.sortFlag,
});

class Pagination extends React.Component<IProps & IStateToProps & ReduxProps<any>, IState> {
  public static defaultProps: Pick<IProps, 'numberOfRows'> = {
    numberOfRows: 10,
  };

  public state: IState = {
    pager: {
      totalItems: 0,
      currentPage: 1,
      pageSize: 0,
      totalPages: 0,
      startPage: 0,
      endPage: 0,
      startIndex: 0,
      endIndex: 0,
      pages: [],
    },
  };

  private _listOfItemIndexes: number[] = [];
  private _isApiDriven: boolean = false;

  public componentDidUpdate(prevProps: IProps, prevState: IState) {
    const allowUpdate: boolean = [this.props.items.length && this.state.pager.totalItems === 0, this.props.items !== prevProps.items].some(Boolean);

    this._isApiDriven = this.props.apiPaginationTotalResults != null;
    if (allowUpdate) {
      /* istanbul ignore next */
      if (this._isApiDriven) {
        this._listOfItemIndexes = [...Array(this.props.apiPaginationTotalResults).keys()];
      }
      /* istanbul ignore next */
      const page: number = this._isApiDriven
        ? // We are assuming if the apiPaginationTotalResults changes then its a new set of data
          // so set the page index to 1
          this.props.apiPaginationTotalResults !== prevProps.apiPaginationTotalResults
          ? 1
          : this.state.pager.currentPage
        : 1;

      this._setPage(page, PaginationEnum.CurrentPage);
    }
  }

  public render() {
    const componentName: string = 'Pagination';
    const { pager } = this.state;
    const canPreviousPage: boolean = pager.currentPage !== pager.startPage;
    const canNextPage: boolean = pager.currentPage !== pager.endPage;

    return (
      <ul className={styles.wrapper} data-automation={`${this.props.dataAutomation}-${componentName}`}>
        <li>
          <button disabled={!canPreviousPage} className={`${styles.listItem} ${styles.skipToFirst}`} onClick={this._onClickFirstPage}>
            <i className="fas fa-angle-double-left" />
          </button>
        </li>
        <li>
          <button disabled={!canPreviousPage} className={`${styles.listItem} ${styles.skipToPrevious}`} onClick={this._onClickPreviousPage}>
            <i className="fas fa-angle-left" />
          </button>
        </li>
        {this._getPageNumbers()}
        <li>
          <button disabled={!canNextPage} className={`${styles.listItem} ${styles.skipToNext}`} onClick={this._onClickNextPage}>
            <i className="fas fa-angle-right" />
          </button>
        </li>
        <li>
          <button disabled={!canNextPage} className={`${styles.listItem} ${styles.skipToLast}`} onClick={this._onClickLastPage}>
            <i className="fas fa-angle-double-right" />
          </button>
        </li>
      </ul>
    );
  }

  private _getPageNumbers(): JSX.Element[] {
    const { pager } = this.state;

    return pager.pages.map((page: number, index: number) => {
      const activePage: number = this.props.sortFlag ? 1 : pager.currentPage;
      const cssClasses: string = classNames({
        [styles.listItem]: true,
        [styles.active]: activePage === page,
      });

      return (
        <li key={index}>
          <button className={cssClasses} onClick={this._onClickCurrentPage} data-page={page}>
            {page}
          </button>
        </li>
      );
    });
  }

  private _setPage(page: any, actionType: PaginationEnum) {
    const { items, numberOfRows } = this.props;
    /* istanbul ignore next */
    const allItems: any[] = this._isApiDriven ? this._listOfItemIndexes : items;
    const pager: IJwPaginate = paginate(allItems.length, page, numberOfRows);
    const indexOfItems = allItems.slice(pager.startIndex, pager.endIndex + 1);

    this.setState({ pager });

    this.props.onChangePagination({
      indexEnd: pager.endIndex,
      indexesOfItems: indexOfItems,
      indexStart: pager.startIndex,
      itemsEnd: pager.endIndex + 1,
      itemsPerPage: pager.pageSize,
      itemsStart: pager.startIndex + 1,
      itemsTotal: pager.totalItems,
      pageCurrent: pager.currentPage,
      pageEnd: pager.endPage,
      pages: pager.pages,
      pageStart: pager.startPage,
      pageTotal: pager.totalPages,
      type: actionType,
    });
  }

  private _onClickFirstPage = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();

    const currentPage: number = 1;

    this._setPage(currentPage, PaginationEnum.FirstPage);
  };

  private _onClickPreviousPage = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();

    const currentPage: number = this.state.pager.currentPage - 1;

    this._setPage(currentPage, PaginationEnum.PreviousPage);
  };

  private _onClickCurrentPage = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();

    const currentPage: number = parseInt((event.target as any).attributes.getNamedItem('data-page').value, 10);

    this._setPage(currentPage, PaginationEnum.CurrentPage);
  };

  private _onClickNextPage = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();

    const currentPage: number = this.state.pager.currentPage + 1;

    this._setPage(currentPage, PaginationEnum.NextPage);
  };

  private _onClickLastPage = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();

    const currentPage: number = this.state.pager.totalPages;

    this._setPage(currentPage, PaginationEnum.LastPage);
  };
}

export { Pagination as Unconnected };
export default connect(mapStateToProps)(Pagination);
