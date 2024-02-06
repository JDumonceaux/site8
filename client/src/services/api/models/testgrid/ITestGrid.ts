import { IMetadata } from '../IMetadata';
import { ITestGridItem } from './ITestGridItem';

export interface ITestGrid {
  readonly metadata: IMetadata;
  readonly items: ITestGridItem[];
}
