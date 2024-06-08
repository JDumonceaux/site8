import { Metadata } from './Metadata';
import { ArtItem } from '../services/types/ArtItem';

export type Art = {
  readonly metadata: Metadata;
  readonly items: ArtItem[];
};
