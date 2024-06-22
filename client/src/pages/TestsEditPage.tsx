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

  console.log('data', data);

  useEffect(() => {
    const ret = data?.map((item) => {
      return {
        id: item.id,
        localId: item.localId,
        name: item.name,
        text: item.text,
        type: item.type?.toString(),
        level: item.level?.toString(),
        projectType: item.projectType?.toString(),
        parentId: item.parentId.toString(),
        parentSeq: item.parentSeq.toString(),
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
        <React.Fragment key={item.localId}>
          <StyledTr>
            <td>{item.id}</td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes(item.localId, 'name')}
                onChange={(e) =>
                  handleChange(item.localId, 'name', e.target.value)
                }
              />
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes(item.localId, 'text')}
                onChange={(e) =>
                  handleChange(item.localId, 'text', e.target.value)
                }
              />
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes(item.localId, 'type')}
                onChange={(e) =>
                  handleChange(item.localId, 'type', e.target.value)
                }
              />
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes(item.localId, 'level')}
                onChange={(e) =>
                  handleChange(item.localId, 'level', e.target.value)
                }
              />
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes(item.localId, 'parentId')}
                onChange={(e) =>
                  handleChange(item.localId, 'parentId', e.target.value)
                }
              />
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes(item.localId, 'parentSeq')}
                onChange={(e) =>
                  handleChange(item.localId, 'parentSeq', e.target.value)
                }
              />
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes(item.localId, 'projectType')}
                onChange={(e) =>
                  handleChange(item.localId, 'projectType', e.target.value)
                }
              />
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes(item.localId, 'action')}
                onChange={(e) =>
                  handleChange(item.localId, 'action', e.target.value)
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
                <th>Id</th>
                <th>Name</th>
                <th>Text</th>
                <th>Type</th>
                <th>Level</th>
                <th>Parent</th>
                <th>Seq</th>
                <th>Project Type</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((item) => (
                <React.Fragment key={item.localId}>
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
