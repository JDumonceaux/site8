import { useMemo, useState } from 'react';

import type { TestGroup, TestSection } from '@site8/shared';

type UseTestFiltersResult = {
  readonly allTags: readonly string[];
  readonly filteredSections: readonly TestSection[];
  readonly sectionFilter: string;
  readonly sectionNames: readonly string[];
  readonly setSectionFilter: (value: string) => void;
  readonly setTagFilter: (value: string) => void;
  readonly tagFilter: string;
};

export const useTestFilters = (
  sections: readonly TestSection[],
): UseTestFiltersResult => {
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');

  // Get unique section names for filter
  const sectionNames = useMemo(
    () =>
      Array.from(
        new Set(
          sections
            .filter((section) => section.name)
            .map((section) => section.name),
        ),
      ).toSorted(),
    [sections],
  );

  // Get unique tags from all items and groups
  const allTags = useMemo(
    () =>
      Array.from(
        new Set(
          sections.flatMap((section) =>
            (section.groups ?? []).flatMap((group) => [
              ...(group.tags ?? []),
              ...(group.items ?? []).flatMap((item) => item.tags ?? []),
            ]),
          ),
        ),
      )
        .filter((tag) => tag.trim() !== '')
        .toSorted(),
    [sections],
  );

  // Filter sections based on selected filters
  const filteredSections = useMemo(() => {
    // Apply section filter
    const sectionFiltered =
      sectionFilter === 'all'
        ? sections
        : sections.filter((section) => section.name === sectionFilter);

    // Apply tag filter
    if (tagFilter === 'all') {
      return sectionFiltered;
    }

    return sectionFiltered.map((section) => {
      const filteredGroups =
        section.groups
          ?.map((group) => {
            // Check if group has the tag or if any items have the tag
            const groupHasTag = group.tags?.includes(tagFilter);
            const filteredItems = group.items?.filter((item) =>
              item.tags?.includes(tagFilter),
            );

            // Include group if it has the tag or has items with the tag
            if (groupHasTag || (filteredItems && filteredItems.length > 0)) {
              return {
                ...group,
                items: groupHasTag ? group.items : filteredItems,
              } as TestGroup;
            }
            return null;
          })
          .filter((group) => group !== null) ?? [];

      return {
        ...section,
        groups: filteredGroups,
      };
    });
  }, [sections, sectionFilter, tagFilter]);

  return {
    allTags,
    filteredSections,
    sectionFilter,
    sectionNames,
    setSectionFilter,
    setTagFilter,
    tagFilter,
  };
};
