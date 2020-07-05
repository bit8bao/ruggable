import styles from './MountainChart.module.scss';

import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Text, { TextSizeEnum } from '../../Text/Text';
import ChartCustomTooltip from '../../ChartCustomTooltip/ChartCustomTooltip';
import IChartPopover from '../../../../Models/IChartPopover';

export interface IMountainChartData {
  readonly label: string;
  readonly 0: number;
  readonly 1: number;
  readonly popover: IChartPopover;
}

interface IProps {
  readonly chartData: IMountainChartData[];
  readonly height?: number | string;
  readonly leftLabel?: string;
  readonly bottomLabel?: string;
  readonly leftLabelOffset?: number;
}
interface IState {}

export default class MountainChart extends React.Component<IProps, IState> {
  public static defaultProps: Omit<IProps, 'chartData'> = {
    height: 200,
    leftLabel: '',
    bottomLabel: '',
  };

  public render(): JSX.Element {
    const { leftLabel, bottomLabel, chartData, height, leftLabelOffset } = this.props;

    return (
      <div className={styles.wrapper}>
        {Boolean(leftLabel) && (
          <Text size={TextSizeEnum.Footnote1} className={styles.leftLabel} style={{ top: leftLabelOffset }}>
            {leftLabel}
          </Text>
        )}
        <div className={styles.charWrapper}>
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={chartData}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip content={<ChartCustomTooltip />} />
              <Area dataKey="0" stroke="#979797" fill="#2D3136" />
              <Area dataKey="1" stroke="#FC9D3F" fill="#564638" />
            </AreaChart>
          </ResponsiveContainer>
          <Text size={TextSizeEnum.Footnote1}>{bottomLabel}</Text>
        </div>
      </div>
    );
  }
}
