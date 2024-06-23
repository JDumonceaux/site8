import { Meta, PageTitle, StyledPlainButton } from 'components';
import StyledLink from 'components/common/Link/StyledLink/StyledLink';
import StyledMain from 'components/common/StyledMain/StyledMain';
import StyledMenu from 'components/common/StyledMain/StyledMenu';
import MenuAdd from 'components/custom/MenuAdd';
import { TextInput } from 'components/form/input';
import { Switch } from 'components/primatives/Switch/Switch';
import RenderLevel from 'components/ui/PagesPage/RenderLevel';
import useAppSettings from 'hooks/useAppSettings';
import usePagesEdit from 'hooks/usePagesEdit';
import React, { useCallback, useEffect } from 'react';
import { styled } from 'styled-components';
import { MenuItem } from 'types';

const PagesEditPage = (): JSX.Element => {
  const { data, isSaved, handleSave, setFormValues, getDefaultProps } =
    usePagesEdit();

  const { showPages, setShowPages } = useAppSettings();

  useEffect(() => {
    const ret = data?.map((item) => {
      return {
        id: item.id,
        localId: item.localId,
        name: item.name,
        parent: item.parentId?.toString() || '0',
        seq: item.parentSeq?.toString(),
        sortby: item.sortby,
        type: item.type,
      };
    });
    if (ret) {
      setFormValues(ret);
    }
  }, [data, setFormValues]);

  const renderItem = useCallback(
    (item: MenuItem | undefined, level: number): JSX.Element | null => {
      if (!item) {
        return null;
      }

      return (
        <React.Fragment key={item.localId}>
          <StyledTr>
            <td>
              {item.type === 'page' ? (
                <StyledLink to={`/admin/page/edit/${item.id}`}>
                  {item.localId}
                </StyledLink>
              ) : (
                item.id
              )}
            </td>
            <RenderLevel level={level}>
              <StyledLink to={item.toComplete || ''}> {item.name}</StyledLink>
            </RenderLevel>
            <td>
              {item.type !== 'root' ? (
                <TextInput {...getDefaultProps(item.localId, 'parent')} />
              ) : null}
            </td>
            <td>
              <TextInput {...getDefaultProps(item.localId, 'seq')} />
            </td>

            <td>
              {item.type !== 'page' ? (
                <TextInput {...getDefaultProps(item.localId, 'sortby')} />
              ) : null}
            </td>
            <td>
              {item.type} - {level}
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
            <StyledMenu>
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
                <li>
                  <StyledSaveButton
                    data-testid="button-save"
                    onClick={handleSave}
                    type="submit">
                    Save
                  </StyledSaveButton>
                </li>
              ) : null}
            </StyledMenu>
          </PageTitle>
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
              {data?.map((item) => (
                <React.Fragment key={item.localId}>
                  {renderItem(item, 0)}
                </React.Fragment>
              ))}
            </tbody>
          </table>
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
