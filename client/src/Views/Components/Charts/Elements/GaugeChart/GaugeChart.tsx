import styles from './GaugeChart.module.scss';
import globalStyles from '../../../../../index.module.scss';

import React from 'react';
import { RadialBar, RadialBarChart } from 'recharts';

interface IGaugeChartProps {
  value: number;
  total: number;
}

const GaugeChart = (props: IGaugeChartProps) => {
  const { value, total } = props;
  const data = [{ percentage: value, fill: 'url(#data)' }];

  const endAngle = 220 - 260 * (value / total);

  return (
    <div className={styles.gaugeChart}>
      <RadialBarChart width={250} height={150} innerRadius={70} barSize={8} startAngle={220} endAngle={endAngle} data={data}>
        <defs>
          <linearGradient id="data" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={globalStyles.teal400} />
            <stop offset="95%" stopColor={globalStyles.green400} />
          </linearGradient>
        </defs>
        <RadialBar fill="url(#data)" dataKey="percentage" />
      </RadialBarChart>
      <div className={styles.gaugeChart_text}>
        <span className="chartNumber">{value}</span>
        <div className="caption2 c-gray">/ {total}</div>
      </div>
    </div>
  );
};

export default GaugeChart;
