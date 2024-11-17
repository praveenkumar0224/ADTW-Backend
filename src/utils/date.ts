import moment from 'moment';

export const isSameMonth = (month: number): boolean => {
  const currentDate = moment();
  const targetDate = moment().month(month - 1);
  return currentDate.isSame(targetDate, 'month');
};

const isRecordExpired = (createdAt: Date, expiresIn: string): boolean => {
  // Convert the createdAt time to a Date object
  const createdTime = new Date(createdAt);

  // Calculate the expiration time by adding expiresIn seconds to createdAt
  const expirationTime = new Date(createdTime.getTime() + Number.parseInt(expiresIn) * 1000);

  // Get the current time
  const currentTime = new Date();

  // Check if the current time is past the expiration time
  return currentTime > expirationTime;
};

export default {
  isSameMonth,
  isRecordExpired
};
