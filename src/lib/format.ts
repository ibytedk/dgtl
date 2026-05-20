export function formatDateTime(value: string | Date) {
  return new Intl.DateTimeFormat("da-DK", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Copenhagen"
  }).format(new Date(value));
}

export function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("da-DK", {
    dateStyle: "medium",
    timeZone: "Europe/Copenhagen"
  }).format(new Date(value));
}

export function formatFileSize(bytes?: number | null) {
  if (!bytes) {
    return "Ukendt størrelse";
  }

  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}
