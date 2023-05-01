//  Jan to Dec -> returns the zero based index
export const getPreviousDay = (date = new Date()) => {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
};

export const getPreviousMonth = () => {
  const current = new Date();
  current.setMonth(current.getMonth() - 1);
  const previousMonth = current.toLocaleString("default", {
    month: "numeric",
  });

  return previousMonth;
};

export const getCurrentYear = () => {
  let currentDate = new Date();
  return currentDate.getFullYear();
};
