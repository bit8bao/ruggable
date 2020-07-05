import globalStyles from '../../../../../index.module.scss';
import styles from './VBarChart.module.scss';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ReferenceLine, ResponsiveContainer, Tooltip } from 'recharts';
// import ChartColorDefs from '../ChartColorDefs/ChartColorDefs';
import IVBarChartDataList from './Models/IVBarChartDataList';

interface IProps {
  readonly barCategoryGap?: string | number;
  readonly tooltipCursor?: {
    [key: string]: any;
  };
  dataList: IVBarChartDataList[];
  readonly referenceLine?: {
    value: number;
    label: string;
    stroke: string;
  };
  readonly ticks?: number[];
  readonly tickFormatter?: (tick: any) => string;
  readonly tooltipRenderer?: (payload: any) => JSX.Element | null;
  readonly unit?: string;
  readonly dataAutomation?: string;
}

const TICK_CONFIG = {
  stroke: 'none',
  fill: globalStyles.grey200,
  fontSize: '12px',
  fontWeight: 400,
};

const VBarChart = (props: IProps) => {
  const { barCategoryGap, dataList, ticks, referenceLine, tooltipCursor, tooltipRenderer, unit, dataAutomation } = props;

  if (dataList.length === 0) {
    return <div>Empty data provided</div>;
  }

  const maxBarCount: number = dataList.reduce((count: number, chartData: any) => {
    if (chartData.data.length >= count) {
      return chartData.data.length;
    }

    return count;
  }, 0);
  const numberOfBarsToCreate: number[] = new Array(maxBarCount).fill(1);

  const axisUnit = unit || '';
  const yAxis = !!ticks ? <YAxis ticks={ticks} unit={axisUnit} tick={TICK_CONFIG} /> : <YAxis unit={axisUnit} tick={TICK_CONFIG} />;

  return (
    <div className={styles.vBarChart} data-automation={`${dataAutomation}-VBarChart`}>
      {/*<ChartColorDefs />*/}
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={dataList} barCategoryGap={barCategoryGap || '10%'}>
          <XAxis dataKey="name" tick={TICK_CONFIG} />
          {yAxis}
          {referenceLine && (
            <ReferenceLine y={referenceLine.value} stroke={referenceLine.stroke} strokeDasharray="6 3" ifOverflow="extendDomain" position="top" />
          )}
          {numberOfBarsToCreate.map((_, index: number) => (
            <Bar key={index} dataKey={`data[${index}]`} />
          ))}
          {tooltipRenderer && <Tooltip content={tooltipRenderer} cursor={tooltipCursor || false} />}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VBarChart;
