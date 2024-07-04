export type ImageSync = {
  readonly fileCount: number;
  readonly recordsUpdated: number;
  readonly issues?: {
    id: number;
    fileName: string;
    folder?: string;
    issue?: string;
  }[];
};
