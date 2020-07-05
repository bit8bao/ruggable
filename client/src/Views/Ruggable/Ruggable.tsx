import styles from './Ruggable.module.scss';
import globalStyles from '../../../index.module.scss';

import React from 'react';
import {connect} from 'react-redux';
import IStore from '../../Models/IStore';
import {ReduxProps} from '../../Models/ReduxProps';
import RuggableTable from "./Components/RuggableTable/RuggableTable";
import LinesFilterBar from "./Components/LinesFilterBar/LinesFilterBar";
import RuggableReportAction from "../../Stores/RuggableReport/RuggableReportAction";
import RuggableModel from "../../Stores/RuggableReport/Models/RuggableModel";
import {getRequesting} from "../../Selector/Requesting/RequestingSelector";
import {getRuggableData} from "../../Selector/Ruggable/RuggableSelector";
import {getErrorText} from "../../Selector/Error/ErrorSelector";
import WarningBox from "../Components/WarningBox/WarningBox";
import LoadingIndicator from "../Components/LoadingIndicator/LoadingIndicator";
import IOrderProductionRuggableModel from "../../Selector/Ruggable/Models/IOrderProductionRuggableModel";
import IValueLabel from "../../Models/IValueLabel";
import { Col } from 'react-flexbox-grid';
import BoxPanel from "../Components/Containers/BoxPanel/BoxPanel";
import VBarChart from "../Components/Charts/Elements/VBarChart/VBarChart";

interface IProps {}
interface IState {
    readonly linesOptions: IValueLabel[];
    readonly chart: boolean;
}
interface IStateToProps {
    readonly ruggableData: RuggableModel[];
    readonly ruggable: IOrderProductionRuggableModel[];
    readonly chart: boolean;
    readonly isRequesting: boolean;
    readonly requestErrorTexts: string;
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
    ruggableData: state.ruggableReport.reports,
    chart: state.ruggableReport.chart,
    ruggable: getRuggableData(state),
    isRequesting: getRequesting(state, [RuggableReportAction.REQUEST_REPORT, RuggableReportAction.REQUEST_ORDERS_BY_PRODUCTION]),
    requestErrorTexts: getErrorText(state, [RuggableReportAction.REQUEST_REPORT_FINISHED, RuggableReportAction.REQUEST_ORDERS_BY_PRODUCTION_FINISHED]),
});

class Ruggable extends React.Component<IProps & IStateToProps & ReduxProps<any>, IState> {

    public state: IState = {
        linesOptions: [{ label: 'Select Line', value: ''}],
        chart: false,
    };

    public componentDidMount() {}

    public componentDidUpdate(prevProps: IStateToProps, prevState: IState) {
        const { ruggableData, ruggable } = this.props;
        if(prevProps.ruggableData !== this.props.ruggableData) {
            ruggableData.map((prod: RuggableModel) => this.props.dispatch(RuggableReportAction.loadOrdersByProduction(prod.id)));
        }

        if(prevProps.ruggable !== this.props.ruggable){
            this.setState({
                linesOptions: [
                    { label: 'Select Line', value: '',},
                    ...ruggable.map((rug): IValueLabel => {
                        return {
                            label: `Line - ${rug.ruggable.prod_type}${rug.ruggable.prod_line}`,
                            value: rug.ruggable.id
                        }
                    })
                ]
            });
        }
    }

    public render(): JSX.Element | null {
        const { isRequesting, requestErrorTexts} = this.props;
        const linesInitialState = {linesState: { label: 'Select Line', value: '', },};
        const componentVName = 'VCharts';
        if (this.props.requestErrorTexts.length) {
            return <WarningBox text="Ruggable data could not be retrieved" />;
        }

        return (
            <div className={styles.wrapper}>
                <LinesFilterBar
                    linesOptions={this.state.linesOptions}
                    initialFilterState={linesInitialState}
                    setLines={this._setLines}
                />
                <div className="hr_3" /><br />
                {!this.props.chart &&
                    <LoadingIndicator isActive={this.props.isRequesting}>
                        <RuggableTable
                            resultsPerPage={35}
                            currentPage={1}
                            ruggableData={this.props.ruggable}
                        />
                    </LoadingIndicator>
                }
                {this.props.chart &&
                <Col xs={12}>
                    <BoxPanel>
                        {/*<VBarChart*/}
                        {/*    dataAutomation={componentVName}*/}
                        {/*    barCategoryGap={12}*/}
                        {/*    tooltipCursor={{*/}
                        {/*        stroke: globalStyles.white,*/}
                        {/*        fill: globalStyles.white,*/}
                        {/*        opacity: 0.1,*/}
                        {/*    }}*/}
                        {/*    dataList={chartData.dataList}*/}
                        {/*    ticks={ticks}*/}
                        {/*    tooltipRenderer={this._tooltipRenderer}*/}
                        {/*    unit=" Days"*/}
                        {/*/>*/}
                    </BoxPanel>
                </Col>
                }
            </div>
        );
  }

    private _setLines = (linesStatus: IValueLabel) => {
        if(linesStatus.value) {
            this.props.dispatch(RuggableReportAction.chart(true));
            this.props.dispatch(RuggableReportAction.clearProduction());
            this.props.dispatch(RuggableReportAction.loadProductionLineOrders(linesStatus.value));
        }
    };
}

export { Ruggable as Unconnected };
export default connect(mapStateToProps)(Ruggable);
