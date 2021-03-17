import moment from 'moment';

export const create1MonthDates = nextShowTime => {
  const nextShowTimeMoment = moment(nextShowTime);
  const dates = [];
  let currentDate = moment();
  const endDate = moment().add(1, 'months');
  while (currentDate.isBefore(endDate)) {
    dates.push(currentDate);
    currentDate = currentDate.clone().add(1, 'days');
  }
  if (nextShowTimeMoment.isAfter(endDate)) {
    dates.push(nextShowTimeMoment);
    for (var i = 1; i < 14; i++) {
      dates.push(nextShowTimeMoment.clone().add(i, 'days'));
    }
  }
  return dates;
};
