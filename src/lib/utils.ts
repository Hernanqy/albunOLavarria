export function padNumber(value: number) {
  return String(value).padStart(3, "0");
}

export function progress(total: number, completed: number) {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function splitInHalf<T>(items: T[]) {
  const half = Math.ceil(items.length / 2);
  return [items.slice(0, half), items.slice(half)];
}
