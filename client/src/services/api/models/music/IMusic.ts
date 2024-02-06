import { IMetadata } from '../IMetadata';
import { IMusicItem } from './IMusicItem';

export interface IMusic {
  readonly metadata: IMetadata;
  readonly items: IMusicItem[];
}
