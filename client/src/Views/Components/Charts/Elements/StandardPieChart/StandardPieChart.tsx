import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Sector } from 'recharts';
import ChartColorDefs from '../ChartColorDefs/ChartColorDefs';

export const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, value, name } = props;
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
      <Sector cx={cx} cy={cy} innerRadius={innerRadius - 5} outerRadius={outerRadius + 5} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 11} outerRadius={outerRadius + 15} fill={fill} />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="#606469" fill="none" />
      <circle cx={ex} cy={ey} r={2} fill="#606469" stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#FFF">
        {`${name.toUpperCase()}`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${value}`}
      </text>
    </g>
  );
};

interface IProps {
  readonly data: {
    fill: string;
    name: string;
    value: number;
    stroke: string;
  }[];
}
interface IState {
  readonly activeIndex: number;
}

export default class StandardPieChart extends React.Component<IProps, IState> {
  public state: IState = {
    activeIndex: 0,
  };

  public onPieEnter = (data: any, index: any) => {
    this.setState({
      activeIndex: index,
    });
  };

  public render() {
    const allValuesZero = this.props.data.every((item) => item.value === 0);
    if (allValuesZero) {
      return <p>No data to display.</p>;
    }

    // Recharts might have a bug, height only works if as a number, not percentage.
    return (
      <ResponsiveContainer width="100%" height={250} key="StandardPieChart">
        <PieChart height={250}>
          <ChartColorDefs />
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={this.props.data}
            dataKey="value"
            innerRadius={68}
            outerRadius={77}
            onMouseEnter={this.onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
