const defaultMonths: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Digit = 0 => Jan , Digit = 12 => Dec
export const convertDigitToMonth = (
  digit: number,
  keyList?: string[]
): string => {
  return defaultMonths[digit];
};

export const digitOneToTwo = (digit: number): string => {
  return digit > 9 ? `${digit}` : `0${digit}`;
};

// Month = 0 => Jan, Month = 11 => Dec
export const getMonthLastDay = (month: number): number => {
  const dayAsString = String(new Date(2008, month + 1, 0)).slice(8, 10);
  return Number(dayAsString);
};
