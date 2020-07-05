export default interface IVBarChartDataList {
  readonly fill: string;
  readonly name: string;
  readonly stroke: string;
  readonly data: number[];
  readonly popover?: {
    label: string;
    data: string[];
  };
}
