// https://momentjs.com/docs/#/displaying/format/
// https://devhints.io/moment

enum DateFormatEnum {
  DayOfMonth = 'D', // 1 2 ... 30 31
  Minutes = 'm', // 0..60
  Seconds = 's', // 1 2 ... 30 31
  DayOfWeekShort = 'ddd', // Sun Mon ... Fri Sat
  Hour = 'h A', // 1 AM ... 10 PM
  Hr = 'hA', // 1AM ... 10PM
  InternationalDate = 'YYYY-MM-DD', // 2019-12-02
  MonthDay = 'MMMM Do', // February 12th
  MonthDayShort = 'MMM D', // Feb 12
  MonthDayTime = 'MMMM D h:mm A', // February 12 1:28 PM
  MonthDayYear = 'MMMM D, YYYY', // February 12, 2019
  MonthDayYearShort = 'MMM D, YYYY', // Feb 12, 2019
  MonthDayYearTimeShort = 'MMM D, YYYY [at] h:mm A', // Apr 11, 2019 at 12:00 AM
  MonthDayYearTimeLong = 'MMM D, YYYY [at] h:mm:ss A', // Apr 11, 2019 at 12:00:00 AM
  MonthShort = 'MMM', // Jan Feb ... Nov Dec
  MonthYear = 'MMMM, YYYY', // February, 2019
  NumericDate = 'M/D/YYYY', // 2/12/2019
  NumericDateFull = 'MM/DD/YYYY', // 02/12/2019
  NumericDateWithTime = 'M/D/YYYY h:mm A', // 2/12/2019 1:40 PM
  NumericMonthDay = 'M/D', // 2/12
  Time = 'h:mm A', // 1:37 PM
  HourMinutes = 'h:mm', // 1:37
  Year = 'YYYY', // 1970 1971 ... 2029 2030
  AmPm = 'A', // PM
}

export default DateFormatEnum;
