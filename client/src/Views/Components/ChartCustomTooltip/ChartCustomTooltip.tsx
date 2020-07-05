import styles from './ChartCustomTooltip.module.scss';

import React from 'react';
import { IMountainChartData } from '../Charts/MountainChart/MountainChart';
import Text, { TextSizeEnum } from '../Text/Text';

interface IProps {
  readonly type?: string;
  readonly payload?: any[];
  readonly label?: string;
}
interface IState {}

export default class ChartCustomTooltip extends React.Component<IProps, IState> {
  public render(): JSX.Element | null {
    const { payload } = this.props;

    if (payload && payload.length > 0) {
      const { popover } = payload[0].payload as IMountainChartData;

      return (
        <div className={styles.wrapper}>
          <Text size={TextSizeEnum.Subhead} className="vr_1">
            {popover.label}
          </Text>
          {popover.dataLabels.map((text: string, index: number) => (
            <Text size={TextSizeEnum.Footnote2} key={`${text + index}`}>
              {text}
            </Text>
          ))}
        </div>
      );
    }

    return null;
  }
}
