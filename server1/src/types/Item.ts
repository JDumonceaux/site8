export type Item = {
  readonly title: string;
  readonly artistId: number;
  readonly description?: string;
  readonly id: number;
  readonly location?: string;
  readonly officialWebAddress?: string;
  readonly tags?: string[];
  readonly artisticPeriod?: string;
};
