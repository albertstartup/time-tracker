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

export const parseTimeField = (value: string) => {
  return value.split(":").map((x) => parseInt(x));
};