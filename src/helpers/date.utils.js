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
  }
  return dates;
};
