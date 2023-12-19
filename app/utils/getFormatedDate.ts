export const getFormatedDate = (timestamp: number): string => {
  const date = new Date(timestamp);

  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
};
