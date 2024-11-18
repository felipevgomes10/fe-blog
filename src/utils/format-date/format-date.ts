export function formatDate(date: Date, locale: string): string {
  const formatter = new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  });

  return formatter.format(date);
}
