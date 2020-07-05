import styles from './RuggableChart.module.scss';
import globalStyles from '../../../index.module.scss';

import React from 'react';
import {connect} from 'react-redux';
import IStore from '../../../../Models/IStore';
import {ReduxProps} from '../../../../Models/ReduxProps';
import { Row, Col } from 'react-flexbox-grid';
import BoxPanel from "../../../Components/Containers/BoxPanel/BoxPanel";
import VBarChart from "../../../Components/VBarChart/VBarChart";
// import { getRuggableChart } from "../../../../Selector/RuggableCharts/LowUtilizationSelector";

interface IProps {}
interface IState {}
interface IStateToProps {
    // readonly chartData: ILowUtilizationChart;
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
    // chartData: getRuggableChart(state),
});

class Ruggable extends React.Component<IProps & IStateToProps & ReduxProps<any>, IState> {

    public state: IState = {};
    public componentDidMount() {}

    public render(): JSX.Element {
       // const { chartData } = this.props;
        // const ticks: number[] = [0, chartData.totalMaxDays];

        const linesInitialState = {
            linesState: { label: 'Select Line', value: '', },
        };

        const linesOptions = [
            { label: 'Select Line', value: '',},
            { label: 'Chicago', value: 'chicago',},
        ];

        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <BoxPanel>
                            {/*<VBarChart*/}
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
                </Row>
            </div>
        );
    }

    private _tooltipRenderer = ({ payload }: any) => {
        if (payload && payload.length > 0) {
            const { popover } = payload[0].payload;

            return (
                <div className={styles.multichart__tooltip}>
                    <p className="no-margin">{popover.label}</p>
                    {popover.data.map((text: string, index: number) => (
                        <p className="no-margin" key={`${text + index}`}>
                            {text}
                        </p>
                    ))}
                </div>
            );
        }

        return null;
    };

}

export { Ruggable as Unconnected };
export default connect(mapStateToProps)(Ruggable);
