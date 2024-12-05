const pad = (num: number) => num.toString().padStart(2, '0');

export const formatDateDD_MM_YYYY = (date: Date) => {
  const targetDate = date instanceof Date ? date : new Date(date);

  const day = pad(targetDate.getDate());
  const month = pad(targetDate.getMonth() + 1);
  const year = targetDate.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatDateDD_MM_YYYY_MM_HH = (date: Date) => {
  const targetDate = date instanceof Date ? date : new Date(date);

  const day = pad(targetDate.getDate());
  const month = pad(targetDate.getMonth() + 1);
  const year = targetDate.getFullYear();
  const hours = pad(targetDate.getHours());
  const minutes = pad(targetDate.getMinutes());

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
};
