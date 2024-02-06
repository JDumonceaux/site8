export interface ITestGridItem {
  readonly id: number;
  readonly area: string;
  readonly subarea?: string;
  readonly value?: string;
  readonly result?: string;
  readonly comment?: string;
  readonly help?: string;
}
