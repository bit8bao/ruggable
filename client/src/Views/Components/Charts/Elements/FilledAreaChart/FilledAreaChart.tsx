import globalStyles from '../../../../../index.module.scss';
import styles from '../VLineChart/VLineChart.module.scss';

import React from 'react';
import { Area, AreaChart, CartesianGrid, Label, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface IProps {
  readonly data: {
    name: string;
    value: number;
  }[];
  readonly referenceLine: {
    label: string;
    value: number;
  };
  readonly tooltipRenderer?: (payload: any) => JSX.Element | null;
}

const TICK_CONFIG: any = {
  stroke: 'none',
  fill: globalStyles.grey200,
  fontSize: '12px',
  fontWeight: 400,
  textTransform: 'uppercase',
};

const FilledAreaChart = (props: IProps) => {
  const { data, referenceLine, tooltipRenderer } = props;

  if (data.length === 0) {
    return <div>Empty data provided</div>;
  }

  const yAxisTicks: any = [-120, -80, -40, 0, 40, 80, 120];

  const dataMax = Math.max(...data.map((i: any) => i.value));
  const dataMin = Math.min(...data.map((i: any) => i.value));

  let off: any = dataMax / (dataMax - dataMin) - 0.3;

  if (dataMax <= 0) {
    off = 0;
  } else if (dataMin >= 0) {
    off = 1;
  }

  return (
    <div className={styles.vLineChart}>
      <ResponsiveContainer key="FilledAreaChart" width="100%" height="90%">
        <AreaChart data={data} margin={{ top: 15, right: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={TICK_CONFIG} />
          <YAxis unit="%" interval={0} tick={TICK_CONFIG} ticks={yAxisTicks} />
          <defs>
            <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor={globalStyles.green400} />
              <stop offset={1} stopColor={globalStyles.red500} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="transparent"
            fillOpacity="1"
            activeDot={{
              stroke: globalStyles.grey600,
              strokeWidth: 1,
              fill: globalStyles.white,
              r: 6,
            }}
            fill="url(#fill)"
          />
          {tooltipRenderer && <Tooltip content={tooltipRenderer} cursor={false} />}
          <ReferenceLine y={referenceLine.value} stroke="white" strokeWidth={2} ifOverflow="extendDomain" position="top">
            <Label value={referenceLine.label} fill={globalStyles.white} position="insideBottomRight" />
          </ReferenceLine>
          ;
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FilledAreaChart;
