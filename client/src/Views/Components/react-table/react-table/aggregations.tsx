export function sum(values: any, rows: any) {
  return values.reduce((summed: any, next: any) => summed + next, 0);
}

export function average(values: any, rows: any) {
  return Math.round((sum(values, rows) / values.length) * 100) / 100;
}
