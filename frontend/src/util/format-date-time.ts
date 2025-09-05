// утиліта для форматування дати/часу
export function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}