export type ItemArtist = {
  readonly id: number;
  readonly name: string;
  readonly surname?: string;
  readonly birth?: string;
  readonly death?: string;
  readonly artistId: number;
  readonly description?: string;
  readonly location?: string;
  readonly official_url?: string;
  readonly tags?: string[];
};
