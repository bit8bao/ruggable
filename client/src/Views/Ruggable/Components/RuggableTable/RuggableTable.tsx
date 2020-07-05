import styles from './Ruggable.module.scss';
import React from 'react';
import { connect } from 'react-redux';
import IStore from '../../../../Models/IStore';
import {ReduxProps} from '../../../../Models/ReduxProps';
import Text, { TextSizeEnum } from '../../../Components/Text/Text';
import TableComponent from "../../../Components/Tables/TableComponent/TableComponent";
import IOrderProductionRuggableModel from "../../../../Selector/Ruggable/Models/IOrderProductionRuggableModel";


interface IProps {
  readonly currentPage: number;
  readonly resultsPerPage: number;
  readonly ruggableData: IOrderProductionRuggableModel[];
}
interface IState {
  readonly column: any;
}
interface IStateToProps {
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({});

class RuggableTable extends React.Component<IProps & IStateToProps & ReduxProps<any>, IState> {

  private _columnsRuggableTable: any[] = [
    {
      Header: 'Line',
      id: 'id',
      accessor: 'id',
      width: 100,
      Cell: (data: any): JSX.Element => {
        const { index } = data.row;
        const { ruggable } = data.row.original as IOrderProductionRuggableModel;
        return (
            <Text size={TextSizeEnum.Table} showEllipsis={true}>
              Line - { ruggable.prod_type }{ ruggable.prod_line }
            </Text>
        );
      },
    },
    {
      Header: 'QTY',
      id: 'qty',
      width: 100,
      Cell: (data: any): JSX.Element => {
        const { orders } = data.row.original as IOrderProductionRuggableModel;
        return (
          <Text size={TextSizeEnum.Table} showEllipsis={true} style={{textAlign: "center"}}>
            {orders}
          </Text>
        );
      },
    },
    {
      Header: 'Status',
      id: 'status',
      Cell: (data: any): JSX.Element => {
        return (
          <Text size={TextSizeEnum.Table} showEllipsis={true}>
          </Text>
        );
      },
    },
  ];

  public render(): JSX.Element | null {
    const componentName: string = 'RuggableTable';

    return (
      <TableComponent
        dataAutomation={componentName}
        columns={this._columnsRuggableTable}
        rowData={this.props.ruggableData}
        noDataMessage="Currently no production line available"
        apiPaginationTotalResults={this.props.ruggableData.length}
      />
    );
  }
}

export { RuggableTable as Unconnected };
export default connect(mapStateToProps)(RuggableTable);
