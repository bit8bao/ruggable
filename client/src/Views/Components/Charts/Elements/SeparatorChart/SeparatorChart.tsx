import styles from './SeparatorChart.module.scss';

import React from 'react';

interface ISeparatorChartProps {
  data: {
    [key: string]: string | number;
  };
  separatorBG?: string;
}

const SeparatorChart = (props: ISeparatorChartProps) => {
  const { data, separatorBG } = props;

  const keys = Object.keys(data);
  const count = keys.length;
  const width = (1 / count) * 100;
  const bg = separatorBG ? separatorBG : 'linear-gradient(90deg, #FF9F40 0%, #FF9F40 50.84%, #EF4836 100%)';

  const separatorValues = keys.map((datum) => {
    return (
      <div className={styles.separatorChartValue} key={datum} style={{ width: `${width}%` }}>
        <span className="chartNumber">{data[datum]}</span>
      </div>
    );
  });

  let separatorBars = new Array(count - 1);
  let separatorBarKey = 0;
  separatorBars = Array.from(separatorBars, () => {
    separatorBarKey++;

    return <div key={separatorBarKey} className={styles.separatorBar} />;
  });

  const separatorLabels = keys.map((datum) => {
    return (
      <div className={styles.separatorChartLabel} key={datum} style={{ width: `${width}%` }}>
        <span className="caption2">{datum}</span>
      </div>
    );
  });

  return (
    <div className={styles.separatorChart}>
      <div className={styles.separatorChartValues}>{separatorValues}</div>
      <div className={styles.separator} style={{ background: bg }}>
        {separatorBars}
      </div>
      <div className={styles.separatorChartValues}>{separatorLabels}</div>
    </div>
  );
};

export default SeparatorChart;
