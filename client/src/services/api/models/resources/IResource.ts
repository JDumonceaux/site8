export interface IResource {
  readonly id: number;
  readonly name?: string;
  readonly description?: string;
  readonly url: string;
  readonly tags?: string[];
  readonly rank?: number;
  readonly set?: number[];
}
