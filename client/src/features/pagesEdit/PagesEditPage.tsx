import { useEffect } from 'react';
import type { JSX } from 'react';

import LoadingWrapper from '@components/core/Loading/LoadingWrapper';
import Meta from '@components/core/Meta/Meta';
import PageTitle from '@components/core/PageTitle/PageTitle';
import StyledLink from '@components/Link/StyledLink/StyledLink';
import StyledPlainButton from '@components/Link/StyledPlainButton/StyledPlainButton';
import { Switch } from '@components/Switch/Switch';
import useAppSettings from '@features/app/useAppSettings';
import Layout from '@features/layouts/Layout/Layout';
import MenuAdd from '@features/pagesEdit/MenuAdd';
import styled from 'styled-components';

import { mapToFormValues } from './mapToFormValues';
import { PageRow } from './PageRow';
import usePagesEdit from './usePagesEdit';

/**
 * Page for editing site pages and menu structure.
 */
const PagesEditPage = (): JSX.Element | null => {
  const {
    data = [],
    error,
    getDefaultProps,
    handleSave,
    isError,
    isLoading,
    isSaved,
    setFormValues,
  } = usePagesEdit();

  const { setShowPages, showPages } = useAppSettings();

  // Initialize form values when data changes
  const formValues = mapToFormValues(data);
  useEffect(() => {
    setFormValues(formValues);
  }, [formValues, setFormValues]);

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
            {!isSaved && (
              <StyledSaveButton
                data-testid="button-save"
                onClick={handleSave}
                type="submit"
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
                    getDefaultProps={getDefaultProps}
                    item={item}
                    key={item.lineId}
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
