import React, { useCallback, useEffect } from 'react';
import LoadingWrapper from 'components/core/Loading/LoadingWrapper';

import Input from 'components/Input/Input';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import StyledPlainButton from 'components/Link/StyledPlainButton/StyledPlainButton';
import Meta from 'components/core/Meta/Meta';
import MenuAdd from 'components/pages/PagesEditPage/MenuAdd';
import PageTitle from 'components/core/PageTitle/PageTitle';
import { Switch } from 'components/Switch/Switch';
import useAppSettings from 'hooks/useAppSettings';
import usePagesEdit from 'hooks/usePagesEdit';
import { styled } from 'styled-components';
import { MenuItem } from 'types';
import Layout from 'components/layouts/Layout/Layout';

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
        localId: item.localId,
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
    (item: MenuItem | undefined): JSX.Element | null => {
      if (!item) {
        return null;
      }

      const level =
        item.type === 'page' ? ' ---- ' : item.type === 'menu' ? ' -- ' : '';

      return (
        <React.Fragment key={item.localId}>
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
                <Input.Text {...getDefaultProps(item.localId, 'parentId')} />
              )}
            </td>
            <td>
              <Input.Text {...getDefaultProps(item.localId, 'parentSeq')} />
            </td>

            <td>
              {item.type === 'page' ? null : (
                <>
                  <Input.Text
                    {...getDefaultProps(item.localId, 'parentSortby')}
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
              {item.type} {item.issue ? '-I' : null} -{item.localId}
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
              onCheckedChange={(error_) => onShowPages(error_)}
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
