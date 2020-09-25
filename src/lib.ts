export interface Entry {
  id: string;
  createdAt: string;
  startDate: string;
  duration: Number;
  details: string;
}

export const getMinutesRoundedDown5 = (date: Date): number => {
  const minutes = date.getMinutes();
  return Math.floor(minutes / 5) * 5;
};

export const getMinutesRoundedUp5 = (date: Date): number => {
  const minutes = date.getMinutes();
  return Math.ceil(minutes / 5) * 5;
};

const padNumber = (num: number) => num.toString().padStart(2, "0");

export const parseJSONDate = (str: string) => new Date(JSON.parse(str));

export const displayStartDate = (startDate: string) => {
  const date = parseJSONDate(startDate);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const displayHours = hours % 12 ? hours % 12 : 12; // if hour is 0, display 12 instead
  return displayHours + ":" + padNumber(minutes);
};

/** Convert startDate to a string that can be passed as a value to an input element */
export const startDateToInputValue = (startDate: string) =>
  padNumber(parseJSONDate(startDate).getHours()) + ":" + padNumber(parseJSONDate(startDate).getMinutes());

export const generateStartDate = () => {
  const now = new Date();
  const startDate = now.setMinutes(getMinutesRoundedDown5(now), 0);
  return JSON.stringify(new Date(startDate));
};

export const createStartDate = (hours: number, minutes: number) => {
  const now = new Date();
  const startDate = now.setHours(hours, minutes, 0);
  return JSON.stringify(new Date(startDate));
};

export const parseTimeField = (value: string) => {
  return value.split(":").map((x) => parseInt(x));
};

export const compareDates = (a: string, b: string) =>
  parseJSONDate(a).getTime() - parseJSONDate(b).getTime();
