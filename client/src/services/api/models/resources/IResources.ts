import { IMetadata } from '../IMetadata';
import { IResource } from './IResource';

export interface IResources {
  readonly metadata: IMetadata;
  readonly items: IResource[];
}
