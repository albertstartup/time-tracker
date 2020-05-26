export interface Entry {
  id: string;
  created: string;
  startTime: string;
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

export const padMinutes = (minutes: number): string => {
  if (minutes < 10) {
    return `0${minutes}`;
  } else {
    return `${minutes}`;
  }
};

export const parseJSONDate = (str: string) => new Date(JSON.parse(str));

export const ampm = (hours: number) => (12 ? "pm" : "am");

export const displayStartTime = (startTime: string) => {
  const date = parseJSONDate(startTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const displayHours = hours % 12 ? hours % 12 : 12; // if hour is 0, display 12 instead
  return displayHours + ":" + padMinutes(minutes);
};

export const compareDates = (a: string, b: string) =>
  parseJSONDate(a).getTime() - parseJSONDate(b).getTime();
