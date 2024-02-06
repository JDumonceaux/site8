import { IMetadata } from '../IMetadata';
import { IArtItem } from './IArtItem';

export interface IArt {
  readonly metadata: IMetadata;
  readonly items: IArtItem[];
}
