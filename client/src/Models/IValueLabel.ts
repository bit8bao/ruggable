export default interface IValueLabel<T = string, M = any> {
  readonly label: string;
  readonly value: T;
  readonly meta?: M;
}
