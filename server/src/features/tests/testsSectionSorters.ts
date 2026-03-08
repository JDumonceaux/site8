import type { TestSection } from '@site8/shared';

export const sortSectionsAndGroups = (sections: TestSection[]): void => {
  sections.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));

  for (const section of sections) {
    if (!section.groups) {
      continue;
    }

    section.groups.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));

    for (const group of section.groups) {
      if (!group.items) {
        continue;
      }

      group.items.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
    }
  }
};
