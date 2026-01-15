import type { JSX } from 'react';
import { useCallback, useEffect, useState } from 'react';

import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import SubjectMenu from '@features/generic/SubjectMenu';
import Layout from '@features/layouts/layout/Layout';
import type { TestGroup, TestSection } from '@site8/shared';
import useTestsAi from '../useTestsAi';
import EditableGroup from './EditableGroup';
import useTestsAiUpdate from './useTestsAiUpdate';
import styled from 'styled-components';

const TestsAiEditPage = (): JSX.Element => {
  const { data, error, isError, isLoading } = useTestsAi();
  const { isLoading: isSaving, mutate } = useTestsAiUpdate();

  const [sections, setSections] = useState<readonly TestSection[]>([]);

  // Update sections when data loads
  useEffect(() => {
    if (data?.sections && sections.length === 0) {
      setSections(data.sections);
    }
  }, [data, sections.length]);

  const handleGroupUpdate = useCallback(
    (sectionId: number, updatedGroup: TestGroup): void => {
      setSections((currentSections) =>
        currentSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              groups: section.groups?.map((group) =>
                group.id === updatedGroup.id ? updatedGroup : group,
              ),
            };
          }
          return section;
        }),
      );
    },
    [],
  );

  const handleSave = (): void => {
    if (!data) {
      return;
    }

    // Prepare the data to send to the API
    const updatedData = {
      metadata: data.metadata,
      sections: [...sections],
    };

    mutate(updatedData);
  };

  const pageTitle = 'Quality Code - Edit Mode';

  return (
    <>
      <Meta title={pageTitle} />
      <Layout.TwoColumn>
        <Layout.Menu>
          <SubjectMenu />
        </Layout.Menu>
        <Layout.Content>
          <LoadingWrapper
            error={error}
            isError={isError}
            isLoading={isLoading}
          >
            <Layout.Article>
              <PageTitle title={pageTitle} />
              <SaveButtonContainer>
                <SaveButton
                  disabled={isSaving}
                  onClick={handleSave}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </SaveButton>
              </SaveButtonContainer>
              <Layout.Section>
                <TestsContainer>
                  {sections
                    .filter(
                      (section) => section.groups && section.groups.length > 0,
                    )
                    .map((section) => (
                      <div key={section.id}>
                        {section.name ? (
                          <SectionTitle>{section.name}</SectionTitle>
                        ) : null}
                        {section.description ? (
                          <SectionDescription>
                            {section.description}
                          </SectionDescription>
                        ) : null}
                        {section.groups
                          ?.filter(
                            (group) => group.items && group.items.length > 0,
                          )
                          .map((group) => (
                            <EditableGroup
                              group={group}
                              key={group.id}
                              onUpdate={(updatedGroup) => {
                                handleGroupUpdate(section.id, updatedGroup);
                              }}
                            />
                          ))}
                      </div>
                    ))}
                </TestsContainer>
              </Layout.Section>
            </Layout.Article>
          </LoadingWrapper>
        </Layout.Content>
      </Layout.TwoColumn>
    </>
  );
};

export default TestsAiEditPage;

// Styled Components

const TestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: var(--font-weight-bold);
  color: var(--text-primary-color);
  margin: 0 0 0.5rem 0;
`;

const SectionDescription = styled.p`
  font-size: 1rem;
  color: var(--text-secondary-color);
  margin: 0 0 1.5rem 0;
`;

const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--surface-background-color);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-light);
`;

const SaveButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: var(--status-success);
  color: var(--text-inverted-color);
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.1s ease,
    opacity 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--status-success-hover);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:focus {
    outline: 2px solid var(--status-success);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
