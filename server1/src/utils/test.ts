const MAX_VERSION_PARTS = 5;

export const versionCompare = (version1: string, version2: string): number => {
  const parts1 = version1.split('.');
  const parts2 = version2.split('.');

  for (let i = 0; i < MAX_VERSION_PARTS; i++) {
    const num1 = Number(parts1[i] ?? 0);
    const num2 = Number(parts2[i] ?? 0);

    if (num1 > num2) {
      return 1;
    }

    if (num1 < num2) {
      return -1;
    }
  }

  return 0;
};
