import globalStyles from '../../../../../index.module.scss';
import styles from './PercentageArrow.module.scss';

import React from 'react';
import Text, { TextSizeEnum } from '../../../Text/Text';

const ColorEnum = {
  good: globalStyles.green400,
  warning: globalStyles.orange500,
  critical: globalStyles.red500,
};

enum ThresholdEnum {
  good = 0,
  warning = 20,
}

interface IProps {
  readonly className?: string;
  readonly postfixLabel?: string;
  readonly showLabel?: boolean;
  readonly target: number;
  readonly value: number;
}

const PercentageArrow = (props: IProps) => {
  const { postfixLabel, value, target, className, showLabel } = props;

  const diffPercent: number = Math.floor(value - target);
  const absDiffPercent: number = Math.abs(diffPercent);
  const isAtOrAboveTarget: boolean = diffPercent >= ThresholdEnum.good;
  const isOnTarget: boolean = absDiffPercent === ThresholdEnum.good;

  // arrow
  const arrowDirection: any = isAtOrAboveTarget ? 'up' : 'down';
  const arrowColor: any = isAtOrAboveTarget ? ColorEnum.good : absDiffPercent < ThresholdEnum.warning ? ColorEnum.warning : ColorEnum.critical;

  // text
  const diffText: any = isAtOrAboveTarget ? 'Above Utilization Target' : 'Below Utilization Target';

  if (isOnTarget) {
    return (
      <div className={className}>
        <Text size={TextSizeEnum.Caption2}>On Target {postfixLabel}</Text>
      </div>
    );
  }

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <i className={`fas fa-caret fa-caret-${arrowDirection} hr_1`} style={{ color: arrowColor }} />
      <Text size={TextSizeEnum.Caption2}>
        {absDiffPercent}% {showLabel ? diffText : ''} {postfixLabel}
      </Text>
    </div>
  );
};

export default PercentageArrow;
