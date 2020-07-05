import styles from './EncircledMetric.module.scss';

import React from 'react';

interface IProps {
  readonly value: string | number;
  readonly label: string;
}

const EncircledMetric = (props: IProps) => {
  const { value, label } = props;

  return (
    <div className={styles.encircledMetric}>
      <div className={styles.encircledMetricBorder}>
        <div className={styles.encircledMetricBg}>
          <span className="chartNumber">{value}</span>
          <span className="caption2 c-white">{label}</span>
        </div>
      </div>
    </div>
  );
};

export default EncircledMetric;
