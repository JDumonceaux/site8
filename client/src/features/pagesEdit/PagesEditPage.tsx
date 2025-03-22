import React, { useCallback, useEffect } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Input from 'components/Input/Input';
import Layout from 'components/layouts/Layout/Layout';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import StyledPlainButton from 'components/Link/StyledPlainButton/StyledPlainButton';
import { Switch } from 'components/Switch/Switch';
import MenuAdd from 'features/pagesEdit/MenuAdd';
import useAppSettings from 'features/app/useAppSettings';
import { styled } from 'styled-components';
import type { MenuItem } from 'types';

import usePagesEdit from './usePagesEdit';

const PagesEditPage = (): React.JSX.Element => {
  const {
    data,
    error,
    getDefaultProps,
    handleSave,
    isLoading,
    isSaved,
    setFormValues,
  } = usePagesEdit();

  const { setShowPages, showPages } = useAppSettings();

  useEffect(() => {
    const returnValue = data?.map((item) => ({
      id: item.id,
      lineId: item.lineId,
      name: item.name,
      parentId: item.parentItem.id ? item.parentItem.id.toString() : '0',
      parentSeq: item.parentItem.seq ? item.parentItem.seq.toString() : '0',
      parentSortby: item.parentItem.sortby ?? '',
      type: item.type,
    }));
    if (returnValue) {
      setFormValues(returnValue);
    }
  }, [data, setFormValues]);

  const renderItem = useCallback(
    (item: MenuItem | undefined): null | React.JSX.Element => {
      if (!item) {
        return null;
      }

      const level = (() => {
        switch (item.type) {
          case 'menu': {
            return ' -- ';
          }
          case 'page': {
            return ' ---- ';
          }
          default: {
            return '';
          }
        }
      })();

      return (
        <React.Fragment key={item.lineId}>
          <StyledTr>
            <td>
              {item.type === 'page' ? (
                <StyledLink to={`/admin/page/edit/${item.id}`}>
                  {item.id}
                </StyledLink>
              ) : (
                item.id
              )}
            </td>
            <td>
              <StyledLink to={item.toComplete ?? ''}>
                {level}
                {item.name}
              </StyledLink>
            </td>
            <td>
              {item.type === 'root' ? null : (
                <Input.Text {...getDefaultProps(item.lineId, 'parentId')} />
              )}
            </td>
            <td>
              <Input.Text {...getDefaultProps(item.lineId, 'parentSeq')} />
            </td>

            <td>
              {item.type === 'page' ? null : (
                <>
                  <Input.Text
                    {...getDefaultProps(item.lineId, 'parentSortby')}
                    list="sortTypes"
                  />
                  <datalist id="sortTypes">
                    <option value="seq" />
                    <option value="name" />
                  </datalist>
                </>
              )}
            </td>
            <td>
              {item.type} {item.issue ? '-I' : null} -{item.lineId}
            </td>
          </StyledTr>
        </React.Fragment>
      );
    },
    [getDefaultProps],
  );

  const onShowPages = (checked: boolean) => {
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
              onCheckedChange={(error_) => {
                onShowPages(error_);
              }}
            />
            <StyledLink data-testid="nav-new" to="/admin/page/edit">
              New
            </StyledLink>
            {isSaved ? null : (
              <StyledSaveButton
                data-testid="button-save"
                onClick={handleSave}
                type="submit">
                Save
              </StyledSaveButton>
            )}
          </PageTitle>
          <LoadingWrapper error={error} isLoading={isLoading}>
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
              <tbody>{data?.map((item) => renderItem(item))}</tbody>
            </table>
          </LoadingWrapper>
          <MenuAdd />
        </Layout.Section>
      </Layout.Main>
    </>
  );
};

export default PagesEditPage;

const StyledTr = styled.tr`
  td {
    padding: 3px 15px;
  }
`;
const StyledSaveButton = styled(StyledPlainButton)`
  font-weight: bold;
`;
