import React from 'react';
import moment from 'moment';
import DateIntervalEnum from '../../../../../Constants/DateIntervalEnum';
import DateFormatEnum from '../../../../../Constants/DateFormatEnum';

interface IDateRangeLabelProps {
  interval: DateIntervalEnum;
}

const DateRangeLabel = (props: IDateRangeLabelProps): null | JSX.Element => {
  const today = moment();

  switch (props.interval) {
    case DateIntervalEnum.Day:
      return <span>{today.format(DateFormatEnum.MonthDayYear)}</span>;
    case DateIntervalEnum.Hours24:
      const twentyFourHoursAgo = today.clone().subtract(24, 'hours');

      return (
        <span>
          {twentyFourHoursAgo.format(DateFormatEnum.MonthDayTime)} - {today.format(DateFormatEnum.MonthDayTime)}
        </span>
      );
    case DateIntervalEnum.Week:
      const startOfWeek = today.clone().startOf('week');

      return (
        <span>
          {startOfWeek.format(DateFormatEnum.MonthDayYear)} - {today.format(DateFormatEnum.MonthDayYear)}
        </span>
      );
    case DateIntervalEnum.Days7:
      const sixDaysAgo = today.clone().subtract(6, 'days');

      return (
        <span>
          {sixDaysAgo.format(DateFormatEnum.MonthDayYear)} - {today.format(DateFormatEnum.MonthDayYear)}
        </span>
      );
    case DateIntervalEnum.Month:
      return <span>{today.format(DateFormatEnum.MonthYear)}</span>;
    case DateIntervalEnum.Days30:
      const twentyNineDaysAgo = today.clone().subtract(29, 'days');

      return (
        <span>
          {twentyNineDaysAgo.format(DateFormatEnum.MonthDayYear)} - {today.format(DateFormatEnum.MonthDayYear)}
        </span>
      );
    case DateIntervalEnum.Year:
      return <span>{today.format(DateFormatEnum.Year)}</span>;
    case DateIntervalEnum.Months12:
      const elevenMonthsAgo = today.clone().subtract(11, 'months');

      return (
        <span>
          {elevenMonthsAgo.format(DateFormatEnum.MonthYear)} - {today.format(DateFormatEnum.MonthYear)}
        </span>
      );
    // ignoring this because TS won't let us pass in a non Enum value, but JS should have a default.
    /* istanbul ignore next */
    default:
      return null;
  }
};

export default DateRangeLabel;
