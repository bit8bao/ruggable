import styles from './TimeBoxedGanttChart.module.scss';

import React from 'react';
import moment, { Moment } from 'moment';
import DateFormatEnum from '../../../../../Constants/DateFormatEnum';
import GridBackground from '../GridBackground/GridBackground';


interface IGanttDatum {
  started: moment.Moment;
  stopped: moment.Moment;
  isOpen: boolean;
}

interface IProps {
  readonly time1stDisplay?: boolean;
  readonly data: {
    [key: string]: {
      duration: string;
      entries: IGanttDatum[];
    };
  };
  readonly labelWidth?: string;
  readonly titles?: {
    top: string;
    bottom: string;
  };
  readonly timeBox: {
    started: moment.Moment;
    stopped: moment.Moment;
  };
}

const TimeBoxedGanttChart = (props: IProps) => {
  const { data, labelWidth, titles, timeBox, time1stDisplay } = props;
  const phases = Object.keys(data);

  const chartDuration = moment.duration(timeBox.stopped.diff(timeBox.started));

  const getEntryStyling = (timeEntry: any, tBox: any, i: number) => {
    const isOpen = timeEntry.isOpen;
    const minWidth: number = 0.5;

    // entry width;
    const duration = isOpen ? moment.duration(tBox.stopped.diff(timeEntry.started)) : moment.duration(timeEntry.stopped.diff(timeEntry.started));
    const durationRatio = duration.asHours() / chartDuration.asHours();
    let durationPercentage = Math.abs(durationRatio * 100);
    const useMinWidth: boolean = durationPercentage < minWidth;

    if (useMinWidth) {
      durationPercentage = minWidth;
    }

    const durationCSS = `${durationPercentage}%`;

    // entry left offset
    const startOffsetDuration = moment.duration(timeEntry.started.diff(tBox.started));
    const offsetRatio = startOffsetDuration.asHours() / chartDuration.asHours();
    let offsetPercentage = Math.abs(offsetRatio * 100);

    if (useMinWidth) {
      offsetPercentage = offsetPercentage - minWidth;
    }

    const offsetCSS = `${offsetPercentage}%`;

    // entry coloring
    const runningStyling = isOpen ? styles.timeBoxedGantt__chart__body__rows__row__entry___running : '';

    // entry style tag and key
    const style = { width: durationCSS, left: offsetCSS };
    const key = timeEntry.started.format();

    return (
      <div key={key + 'getEntryStyling' + i} style={style} className={`${styles.timeBoxedGantt__chart__body__rows__row__entry} ${runningStyling}`} />
    );
  };

  const getTimeBox = (time: Moment): JSX.Element => {
    return (
      <div>
        {time1stDisplay && (
          <div>
            <span>
              {time
                .clone()
                .local()
                .format(DateFormatEnum.NumericDate)}
            </span>
            <br />
            <span>
              {time
                .clone()
                .local()
                .format(DateFormatEnum.Time)}
            </span>
          </div>
        )}
      </div>
    );
  };

  const chartBodyRows = phases.map((phase, index) => {
    const entries = data[phase].entries;

    return (
      <div className={styles.timeBoxedGantt__chart__body__rows__row} key={phase + 'chartBodyRows' + index}>
        {entries.map((timeEntry, index) => {
          return getEntryStyling(timeEntry, timeBox, index);
        })}
      </div>
    );
  });

  const bookendsWidthStyle = labelWidth ? { marginLeft: labelWidth } : undefined;
  const labelWidthStyle = labelWidth ? { width: labelWidth } : undefined;
  const rowsWidthStyle = labelWidth ? { width: `calc(100% - ${labelWidth})` } : undefined;

  return (
    <div className={styles.timeBoxedGantt}>
      <div className={styles.timeBoxedGantt__chart}>
        <div className={styles.timeBoxedGantt__chart__bookends} style={bookendsWidthStyle}>
          <div className={styles.timeBoxedGantt__chart__bookends__bookend}>{getTimeBox(timeBox.started)}</div>
          {titles && (
            <div className={styles.timeBoxedGantt__chart__bookends__titles}>
              <span className={styles.timeBoxedGantt__chart__bookends__titles__top}>{titles.top}</span>
              <span className={styles.timeBoxedGantt__chart__bookends__titles__bottom}>{titles.bottom}</span>
            </div>
          )}
          <div className={styles.timeBoxedGantt__chart__bookends__bookend}>{getTimeBox(timeBox.stopped)}</div>
        </div>
        <div className={styles.timeBoxedGantt__chart__body}>
          <div className={styles.timeBoxedGantt__chart__body__labels} style={labelWidthStyle}>
            {phases.map((phase, index) => {
              return (
                <div className={styles.timeBoxedGantt__chart__body__labels__label} key={phase + index}>
                  <span>{phase}</span>
                  <span>{data[phase].duration}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.timeBoxedGantt__chart__body__rows} style={rowsWidthStyle}>
            <div className={styles.timeBoxedGantt__chart__body__rows__background}>
              <GridBackground squareSize={16} lineStroke="#41474d" />
            </div>
            {chartBodyRows}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeBoxedGanttChart;
