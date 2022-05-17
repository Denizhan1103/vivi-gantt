interface CreateDivElement {
  elementType?: string;
  classList?: string | string[];
  textContent?: string;
  bgColor?: string;
  width?: number;
  height?: number;
}

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

export const createDomElement = ({ elementType, classList, textContent, bgColor, width, height }: CreateDivElement): HTMLElement => {
  const element = elementType ? document.createElement(elementType) : document.createElement('div')
  if (classList) Array.isArray(classList) ? element.classList.add(...classList) : element.classList.add(classList)
  if (textContent) element.textContent = textContent
  if (bgColor) element.style.backgroundColor = bgColor
  if (width) element.style.width = `${width}px`
  if (height) element.style.height = `${height}px`
  return element
}