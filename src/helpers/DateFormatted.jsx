export const DateFormatted = (year, monthNumber, day) => {
  const dateFormatted = `${year}-${
    monthNumber < 10 ? `0${monthNumber}` : monthNumber
  }-${day}`;

  return dateFormatted;
};
