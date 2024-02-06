import { IMetadata } from '../IMetadata';
import { IPage } from './IPage';

export interface IPages {
  readonly metadata: IMetadata;
  readonly items: IPage[];
}
