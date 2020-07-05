import globalStyles from '../../../../../index.module.scss';
import styles from './VLineChart.module.scss';

import React from 'react';
import { Label, LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Cell, Legend, ReferenceLine } from 'recharts';
import Color from 'color';
import ChartColorDefs, { getCellColor } from '../ChartColorDefs/ChartColorDefs';

interface IVLineChartProps {
  lineType?: string;
  data: any;
  referenceLine?: {
    value: number;
    label: string;
  };
}

const TICK_CONFIG = {
  stroke: 'none',
  fill: globalStyles.grey200,
  fontSize: '12px',
  fontWeight: 400,
};

const ORANGE_BASE = Color(globalStyles.orange500);

const VLineChart = (props: IVLineChartProps) => {
  const { data, referenceLine, lineType = 'linear' } = props;

  const dataKeys = !data ? [] : Object.keys(data);

  if (dataKeys.length === 0) {
    return (
      <div style={{ height: '250px' }} className="utl-display_center utl-vertical_center txt-italic">
        Invalid data
      </div>
    );
  }

  let valueKeys: string[] = [];
  const chartData = dataKeys.map((name) => {
    const value = data[name];
    valueKeys = Object.keys(value);

    if (valueKeys.length === 0) {
      return { name: name.toUpperCase(), value };
    }

    const newValue = { name: name.toUpperCase(), ...value };

    return newValue;
  });

  const renderLines = () => {
    if (valueKeys.length === 0) {
      return (
        <Line
          dataKey="value"
          dot={{ r: 6, stroke: globalStyles.grey200, fill: globalStyles.grey600, strokeWidth: 1 }}
          strokeWidth={4}
          type={lineType}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={index}
              fill={getCellColor({
                solid: false,
                positive: true,
                vertical: true,
              })}
            />
          ))}
        </Line>
      );
    }

    return valueKeys.map((key, keyIndex) => {
      const fill = keyIndex === 0 ? globalStyles.blue500 : ORANGE_BASE.darken(keyIndex * 0.2);
      const strokeWidth = keyIndex === 0 ? 4 : 1;
      const dotRadius = keyIndex === 0 ? 3 : 0;

      return (
        <Line
          type={lineType}
          strokeWidth={strokeWidth}
          dataKey={key}
          key={key}
          dot={{ r: dotRadius, stroke: fill, fill, strokeWidth: 1 }}
          stroke={fill}
        />
      );
    });
  };

  let refLine;
  if (referenceLine) {
    refLine = (
      <ReferenceLine y={referenceLine.value} stroke="white" strokeWidth={2} ifOverflow="extendDomain" position="top">
        <Label value={referenceLine.label} fill={globalStyles.white} position="top" />
      </ReferenceLine>
    );
  }

  return (
    <div className={styles.vLineChart}>
      <ChartColorDefs />
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={chartData} margin={{ left: 0, right: 15 }} padding={{ right: 15 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={globalStyles.grey200} horizontal={false} />
          <XAxis dataKey="name" tick={TICK_CONFIG} interval={0} />
          <YAxis tick={TICK_CONFIG} padding={{ top: 15 }} />
          <Legend iconType="circle">
            <li key={9999}>Foo</li>
          </Legend>
          {refLine}
          {renderLines()}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VLineChart;
