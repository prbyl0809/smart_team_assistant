const toDate = (value: string | Date): Date =>
  value instanceof Date ? value : new Date(value);

export const formatDate = (value: string | Date) =>
  new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(toDate(value));

export const formatDateTime = (value: string | Date) =>
  new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(toDate(value));
