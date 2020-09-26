/** Gets the last minute that is a multiple of 5 or 0.
 * This function is used to generate startDate of a time entry.
 * @example
 * 4:O1 -> 4:00
 * 4:17 -> 4:15
 */
export const getMinutesRoundedDown5 = (date: Date): number => {
  const minutes = date.getMinutes();
  return Math.floor(minutes / 5) * 5;
};

/** Gets the next minute that is a multiple of 5.
 * @example
 * 4:08 -> 4:10
 */
export const getMinutesRoundedUp5 = (date: Date): number => {
  const minutes = date.getMinutes();
  return Math.ceil(minutes / 5) * 5;
};

/** Gets how many more minutes until the next multiple of 5.
 * @example
 * 4:03 -> 2
 */
export const getMinutesFromNext5 = (date: Date) => {  
  return getMinutesRoundedUp5(date) - date.getMinutes()
}

/** Gets how many milliseconds are left until the next minute of multiple 5.
 * @example
 * 4:04 -> 60,000
 * @example
 * 4:00 -> 300,000
 */
export const getMillisecondsFromNext5 = (date: Date) => {
  const minutesInMilliseconds = getMinutesFromNext5(date) * 60000
  const secondsInMilliseconds = (60 - date.getSeconds()) * 1000
  return minutesInMilliseconds + secondsInMilliseconds
}

/** Pads a single digit number with a leading zero to make it two digits.
 * @example
 * 1 -> 01
*/
const padNumber = (num: number) => num.toString().padStart(2, "0");

export const parseJSONDate = (str: string) => new Date(JSON.parse(str));

export const displayStartDate = (startDate: string) => {
  const date = parseJSONDate(startDate);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const displayHours = hours % 12 ? hours % 12 : 12; // if hour is 0, display 12 instead
  return displayHours + ":" + padNumber(minutes);
};

/** Convert startDate to a string that can be passed as a value to an input element. */
export const startDateToInputValue = (startDate: string) =>
  padNumber(parseJSONDate(startDate).getHours()) +
  ":" +
  padNumber(parseJSONDate(startDate).getMinutes());

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
