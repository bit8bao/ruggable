import React from 'react';
import ReactTableComponent from '../../react-table/ReactTableComponent';
import IPaginateState from '../CommonComponents/Pagination/IPaginateState';
import WarningBox from '../../WarningBox/WarningBox';
import LoadingIndicator from '../../LoadingIndicator/LoadingIndicator';
import IStore from '../../../../Models/IStore';
import {ReduxProps} from '../../../../Models/ReduxProps';
import {connect} from 'react-redux';

interface IProps {
  readonly rowData: any[];
  readonly columns: any[];
  readonly dataAutomation: string;
  readonly apiPaginationTotalResults?: number | null;
  readonly apiPaginationUnknown?: {
    onLoadMore: () => void;
  };
  readonly noDataMessage?: string | JSX.Element;
  readonly numberOfRows?: number;
  readonly onPaginationChange?: (paginateState: IPaginateState) => void;
  readonly showLoader?: boolean;
  readonly showPagination?: boolean;
  readonly styleTheme?: object;
  readonly initialPage?: IPaginateState | undefined;
}
interface IState {}
interface IStateToProps {
  readonly sortFlag: boolean;
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  sortFlag: state.table.sortFlag,
});

class TableComponent extends React.Component<IProps & IStateToProps & ReduxProps<any>, IState> {
  public static defaultProps: Omit<IProps, 'rowData' | 'columns' | 'dataAutomation'> = {
    apiPaginationTotalResults: null,
    apiPaginationUnknown: undefined,
    noDataMessage: 'Sorry, no data found.',
    numberOfRows: 20,
    onPaginationChange: undefined,
    showLoader: false,
    showPagination: true,
    styleTheme: undefined,
  };

  public render(): JSX.Element {
    const componentName: string = 'TableComponent';
    const {
      noDataMessage,
      rowData,
      columns,
      showLoader,
      numberOfRows,
      onPaginationChange,
      apiPaginationTotalResults,
      apiPaginationUnknown,
      showPagination,
      dataAutomation,
      styleTheme,
      initialPage,
      sortFlag,
    } = this.props;

    const sortState = { sortBy: {id: 'duration', desc: true} };

    if (!showLoader && rowData.length === 0) {
      return <WarningBox text={noDataMessage!} dataAutomation={componentName} />;
    }

    return (
      <LoadingIndicator isActive={showLoader}>
        <ReactTableComponent
          {...{
            data: rowData,
            columns,
            initialPage,
            sortFlag,
            debug: false,
            numberOfRows,
            apiPaginationTotalResults,
            apiPaginationUnknown,
            onPaginationChange,
            showPagination,
            styleTheme,
            dataAutomation: `${dataAutomation}-${componentName}`,
          }}
        />
      </LoadingIndicator>
    );
  }
}

export { TableComponent as Unconnected };
export default connect(mapStateToProps)(TableComponent);
