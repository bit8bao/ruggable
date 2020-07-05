import globalStyles from '../../../../../index.module.scss';

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Sector } from 'recharts';
import ChartColorDefs, { getCellColor } from '../ChartColorDefs/ChartColorDefs';

interface IProps {
  readonly data: { [key: string]: string | number | boolean }[];
}
interface IState {
  readonly activeIndex: number;
}

export const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    total,
    name,
    hideActiveBar,
    activeBarFill,
    barRadiusIncrease,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 15) * cos;
  const sy = cy + (outerRadius + 15) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  /* istanbul ignore next */
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  /* istanbul ignore next */
  const textAnchor = cos >= 0 ? 'start' : 'end';

  /* istanbul ignore next */
  return (
    <g>
      <circle r={55} cx={cx} cy={cy} fill="#222529" stroke="none" />
      <text x={cx} y={cy} dy={8} className="chartNumber" textAnchor="middle" fill="#FFF">
        {value}
      </text>
      <text x={cx} y={cy} dy={32} textAnchor="middle" fill="#FFF">
        {name.toUpperCase()}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - barRadiusIncrease}
        outerRadius={outerRadius + barRadiusIncrease}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      {!hideActiveBar && (
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6 + barRadiusIncrease}
          outerRadius={outerRadius + 10 + barRadiusIncrease}
          fill={activeBarFill}
        />
      )}
      {/* These are the styles for the line with text of this component */}
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="#606469" fill="none" />
      <circle cx={ex} cy={ey} r={2} fill="#606469" stroke="none" />
      <text className="callout" x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#FFF">
        {`${(percent * 100).toFixed(1)}%`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#FFF">
        {`(${value}/${total})`}
      </text>
    </g>
  );
};

export default class PieGaugeChart extends React.Component<IProps, IState> {
  public state: IState = {
    activeIndex: 0,
  };

  public onPieEnter = (data: any, index: any) => {
    this.setState({
      activeIndex: index,
    });
  };

  public render() {
    const { activeIndex } = this.state;
    const { data } = this.props;

    return (
      <ResponsiveContainer width="90%" height="100%">
        <PieChart>
          <ChartColorDefs />
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            dataKey="value"
            data={data}
            innerRadius={68}
            outerRadius={77}
            fill={globalStyles.teal400}
            onMouseEnter={this.onPieEnter}
            stroke="none"
            startAngle={220}
            endAngle={-140}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
