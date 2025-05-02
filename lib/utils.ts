type FormatType = 'long' | 'short' | 'numeric' | 'yyyy-MM-dd' | Intl.DateTimeFormatOptions;

export function formatDate(dateString: string, format: FormatType = 'long'): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  if (format === 'yyyy-MM-dd') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  let options: Intl.DateTimeFormatOptions;

  switch (format) {
    case 'long':
      options = { year: 'numeric', month: 'long', day: 'numeric' };
      break;
    case 'short':
      options = { year: '2-digit', month: 'short', day: 'numeric' };
      break;
    case 'numeric':
      options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      break;
    default:
      options = format;
  }

  return date.toLocaleDateString('en-US', options);
}
