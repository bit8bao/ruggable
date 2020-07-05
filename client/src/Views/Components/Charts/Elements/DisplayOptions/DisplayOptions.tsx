import styles from './DisplayOptions.module.scss';

import React from 'react';
import DateIntervalEnum from '../../../../../Constants/DateIntervalEnum';
import IIntervalLabelValue from '../../../../../Models/IIntervalLabelValue';

interface IProps {
  readonly displayInterval: boolean;
  readonly intervalClickHandler: (interval: DateIntervalEnum) => void;
  readonly activeInterval: string | null;
  readonly intervals: IIntervalLabelValue[];
  readonly displayFormat: boolean;
  readonly formatClickHandler?: (format: string) => void;
  readonly activeFormat: string | null;
  readonly formats: { value: string; icon: string }[];
}

const DisplayOptions = (props: IProps) => {
  const { displayInterval, intervalClickHandler, activeInterval, intervals, displayFormat, formatClickHandler, activeFormat, formats } = props;

  const _intervalClickHandler = (value: any) => (event: React.MouseEvent<HTMLButtonElement>) => {
    intervalClickHandler(value);
  };
  const _formatClickHandler = (value: any) => (event: React.MouseEvent<HTMLButtonElement>) => {
    if (formatClickHandler) {
      formatClickHandler(value);
    }
  };

  const getIntervalBtns = () => {
    if (!displayInterval || !intervals) {
      return null;
    }

    return intervals.map((int: IIntervalLabelValue) => {
      return (
        <button
          key={int.value}
          className={`btn btn-link ${int.value === activeInterval ? 'active-chart-btn' : ''}`}
          onClick={_intervalClickHandler(int.value)}
        >
          {int.label}
        </button>
      );
    });
  };

  const getformatBtns = () => {
    if (!displayFormat || !formats) {
      return null;
    }

    return formats.map((format: any) => {
      return (
        <button
          key={format.value}
          className={`btn btn-link ${format.value === activeFormat ? 'active-chart-btn' : ''}`}
          onClick={_formatClickHandler(format.value)}
        >
          <i className={`fas ${format.icon}`} />
        </button>
      );
    });
  };

  const intervalBtns = getIntervalBtns();
  const formatBtns = getformatBtns();

  return (
    <div className={styles.displayOptions}>
      <div className="pull-left">{intervalBtns}</div>
      <div className="pull-right">{formatBtns}</div>
    </div>
  );
};

export default DisplayOptions;
