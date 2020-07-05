import globalStyles from '../../../../../index.module.scss';
import styles from './HBarChart.module.scss';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Cell, ReferenceLine, Tooltip } from 'recharts';
import IChartNameValue from '../../../../../Models/Charts/IChartNameValue';

interface IProps {
  readonly data: IChartNameValue[];
  readonly tooltip?: any;
  readonly referenceLine?: {
    value: number;
    stroke: string;
    label: string;
  };
  readonly yAxisWidth?: number | undefined;
}

const TICK_CONFIG = {
  stroke: 'none',
  fill: globalStyles.grey200,
  fontSize: '12px',
  fontWeight: 400,
  textTransform: 'uppercase',
  marginLeft: '5px',
};

const HBarChart = (props: IProps) => {
  const { data, referenceLine, tooltip, yAxisWidth } = props;

  return (
    <div className={styles.hBarChart}>
      <ResponsiveContainer width="90%" height="90%">
        <BarChart data={data} barSize={16} layout="vertical" margin={{ left: 20, bottom: 10 }}>
          {tooltip && <Tooltip content={tooltip} cursor={false} />}
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" allowDecimals={false} tick={TICK_CONFIG} />
          <YAxis type="category" dataKey="name" tick={TICK_CONFIG} interval={0} width={yAxisWidth} />
          <Bar dataKey="value">
            {data.map((datum, index) => (
              <Cell key={index} fill={globalStyles.blue500} />
            ))}
          </Bar>
          {referenceLine && <ReferenceLine x={referenceLine.value} stroke={referenceLine.stroke} label={referenceLine.label} />}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HBarChart;
