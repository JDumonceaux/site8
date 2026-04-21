/**
 * Parse a comma-separated string of tags into an array
 */
export const parseTags = (tagString: string): string[] =>
  tagString
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

/**
 * Format an array of tags into a comma-separated string
 */
export const formatTags = (tags: readonly string[] | undefined): string =>
  tags?.join(', ') ?? '';
