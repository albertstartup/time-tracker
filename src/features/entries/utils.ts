import { nanoid } from "nanoid";

export interface Entry {
  id: string;
  createdAt: string;
  startDate: string;
  duration: number;
  details: string;
}

export const generateEntry = (
  startDate: string,
  duration: number,
  details: string
) => {
  const now = new Date();

  return {
    id: nanoid(),
    createdAt: JSON.stringify(now),
    startDate: startDate,
    duration,
    details,
  };
};