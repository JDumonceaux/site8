import { useEffect, useEffectEvent } from 'react';
import type { JSX } from 'react';

import LoadingWrapper from '@components/core/loading/LoadingWrapper';
import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import StyledLink from '@components/link/styled-link/StyledLink';
import StyledPlainButton from '@components/link/styled-plain-button/StyledPlainButton';
import Switch from '@components/switch-temp/Switch';
import useAppSettings from '@features/app/useAppSettings';
import Layout from '@features/layouts/layout-temp/Layout';
import { mapToFormValues } from './mapToFormValues';
import MenuAdd from './MenuAdd';
import PageRow from './PageRow';
import usePagesEdit from './usePagesEdit';
import styled from 'styled-components';

/**
 * Page for editing site pages and menu structure.
 */
const PagesEditPage = (): JSX.Element | null => {
  const {
    data = [],
    error,
    handleSave,
    isError,
    isLoading,
    isSaved,
    setFormValues,
  } = usePagesEdit();

  const { setShowPages, showPages } = useAppSettings();

  // Initialize form values when data changes
  const formValues = mapToFormValues(data);
  const setFormValuesEvent = useEffectEvent(() => {
    setFormValues(formValues);
  });
  useEffect(() => {
    setFormValuesEvent();
  }, [formValues]);

  const onToggleShowPages = (checked: boolean) => {
    setShowPages(checked);
  };

  return (
    <>
      <Meta title="Pages" />
      <Layout.Main>
        <Layout.Section>
          <PageTitle title="Pages">
            <Switch
              checked={showPages}
              id="showPages"
              label={showPages ? 'Hide Pages' : 'Show Pages'}
              onCheckedChange={onToggleShowPages}
            />
            <StyledLink
              data-testid="nav-new"
              to="/admin/page/edit"
            >
              New
            </StyledLink>
            {isSaved ? null : (
              <StyledSaveButton
                data-testid="button-save"
                type="submit"
                onClick={() => {
                  void handleSave();
                }}
              >
                Save
              </StyledSaveButton>
            )}
          </PageTitle>
          <LoadingWrapper
            error={error}
            isError={isError}
            isLoading={isLoading}
          >
            <table>
              <thead>
                <tr>
                  <th>Edit</th>
                  <th>Name</th>
                  <th>Parent</th>
                  <th>Seq</th>
                  <th>Sortby</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <PageRow
                    key={item.lineId}
                    item={item}
                  />
                ))}
              </tbody>
            </table>
          </LoadingWrapper>
          <MenuAdd />
        </Layout.Section>
      </Layout.Main>
    </>
  );
};

PagesEditPage.displayName = 'PagesEditPage';
export default PagesEditPage;

const StyledSaveButton = styled(StyledPlainButton)`
  font-weight: bold;
`;
