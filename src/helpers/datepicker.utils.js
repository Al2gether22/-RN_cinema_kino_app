export const scrollToIndex = (datePickerRef, dates, item) => {
  datePickerRef.current.scrollToIndex({
    index: dates.indexOf(item),
    animated: true,
  });
};
