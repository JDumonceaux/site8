import { LoadingWrapper, Meta, PageTitle, StyledPlainButton } from 'components';
import StyledLink from 'components/common/Link/StyledLink/StyledLink';
import StyledMain from 'components/common/StyledMain/StyledMain';
import MenuAdd from 'components/custom/MenuAdd';
import { TextInput } from 'components/form/input';
import { Switch } from 'components/Radix/Switch';
import useAppSettings from 'hooks/useAppSettings';
import usePagesEdit from 'hooks/usePagesEdit';
import React, { useCallback, useEffect } from 'react';
import { styled } from 'styled-components';
import { MenuItem } from 'types';

const PagesEditPage = (): JSX.Element => {
  const {
    data,
    isSaved,
    error,
    isLoading,
    handleSave,
    setFormValues,
    getDefaultProps,
  } = usePagesEdit();

  const { showPages, setShowPages } = useAppSettings();

  useEffect(() => {
    const ret = data?.map((item) => {
      return {
        id: item.id,
        localId: item.localId,
        name: item.name,
        parentId: item.parent.id ? item.parent.id.toString() : '0',
        parentSeq: item.parent.seq ? item.parent.seq.toString() : '0',
        parentSortby: item.parent.sortby || '',
        type: item.type,
      };
    });
    if (ret) {
      setFormValues(ret);
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
              <StyledLink to={item.toComplete || ''}>
                {level}
                {item.name}
              </StyledLink>
            </td>
            <td>
              {item.type !== 'root' ? (
                <TextInput {...getDefaultProps(item.localId, 'parentId')} />
              ) : null}
            </td>
            <td>
              <TextInput {...getDefaultProps(item.localId, 'parentSeq')} />
            </td>

            <td>
              {item.type !== 'page' ? (
                <TextInput {...getDefaultProps(item.localId, 'parentSortby')} />
              ) : null}
            </td>
            <td>
              {item.type} {item.issue ? 'I' : null}
            </td>
          </StyledTr>
        </React.Fragment>
      );
    },
    [getDefaultProps],
  );

  const onShowPages = useCallback(
    (checked: boolean) => {
      setShowPages(checked);
    },
    [setShowPages],
  );

  return (
    <>
      <Meta title="Pages" />
      <StyledMain>
        <StyledMain.Section>
          <PageTitle title="Pages">
            <Switch
              checked={showPages}
              id="showPages"
              label={showPages ? 'Hide Pages' : 'Show Pages'}
              onCheckedChange={(e) => onShowPages(e)}
            />
            <StyledLink data-testid="nav-new" to="/admin/page/edit">
              New
            </StyledLink>
            {!isSaved ? (
              <StyledSaveButton
                data-testid="button-save"
                onClick={handleSave}
                type="submit">
                Save
              </StyledSaveButton>
            ) : null}
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
        </StyledMain.Section>
      </StyledMain>
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
