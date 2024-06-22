import { Meta, PageTitle, StyledPlainButton } from 'components';
import StyledLink from 'components/common/Link/StyledLink/StyledLink';
import StyledMain from 'components/common/StyledMain/StyledMain';
import StyledMenu from 'components/common/StyledMain/StyledMenu';
import MenuAdd from 'components/custom/MenuAdd';
import { TextInput } from 'components/form/input';
import { Switch } from 'components/primatives/Switch/Switch';
import useAppSettings from 'hooks/useAppSettings';
import useTestsEdit from 'hooks/useTestsEdit';
import React, { useCallback, useEffect } from 'react';
import { styled } from 'styled-components';
import { Test } from 'types/Test';

const TestsEditPage = (): JSX.Element => {
  const {
    data,
    isSaved,
    handleChange,
    handleSave,
    setFormValues,
    getStandardTextInputAttributes,
  } = useTestsEdit();

  const { showPages, setShowPages } = useAppSettings();

  useEffect(() => {
    const ret = data?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        text: item.text,
        type: item.type?.toString(),
        level: item.level?.toString(),
        projectType: item.projectType?.toString(),
        parent: item.parent?.toString(),
        action: '',
      };
    });
    if (ret) {
      setFormValues(ret);
    }
  }, [data, setFormValues]);

  const renderItem = useCallback(
    (item: Test | undefined): JSX.Element | null => {
      if (!item) {
        return null;
      }

      return (
        <React.Fragment key={item.id}>
          <StyledTr>
            <td>{item.id}</td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes(item.id, 'name')}
                onChange={(e) => handleChange(item.id, 'name', e.target.value)}
              />
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes(item.id, 'text')}
                onChange={(e) => handleChange(item.id, 'text', e.target.value)}
              />
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes(item.id, 'type')}
                onChange={(e) => handleChange(item.id, 'type', e.target.value)}
              />
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes(item.id, 'level')}
                onChange={(e) => handleChange(item.id, 'level', e.target.value)}
              />
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes(item.id, 'parent')}
                onChange={(e) =>
                  handleChange(item.id, 'parent', e.target.value)
                }
              />
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes(item.id, 'action')}
                onChange={(e) =>
                  handleChange(item.id, 'action', e.target.value)
                }
              />
            </td>
          </StyledTr>
        </React.Fragment>
      );
    },
    [getStandardTextInputAttributes, handleChange],
  );

  const onShowPages = useCallback(
    (checked: boolean) => {
      setShowPages(checked);
    },
    [setShowPages],
  );

  return (
    <>
      <Meta title="Tests" />
      <StyledMain>
        <StyledMain.Section>
          <PageTitle title="Tests">
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
                <React.Fragment key={item.id}>
                  {renderItem(item)}
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

export default TestsEditPage;

const StyledTr = styled.tr`
  td {
    padding: 3px 15px;
  }
`;
const StyledSaveButton = styled(StyledPlainButton)`
  font-weight: bold;
`;
