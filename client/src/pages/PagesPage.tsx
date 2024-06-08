'use client';
import React, { useCallback, useEffect } from 'react';
import StyledLink from 'components/common/Link/StyledLink/StyledLink';
import { Meta, PageTitle, StyledPlainButton } from 'components';
import StyledMain from 'components/common/StyledMain/StyledMain';
import { styled } from 'styled-components';
import { TextInput } from 'components/form/input';
import usePagesEdit from 'hooks/usePagesEdit';
import StyledMenu from 'components/common/StyledMain/StyledMenu';
import MenuAdd from 'components/custom/MenuAdd';
import { MenuItem } from 'types';

const PagesPage = (): JSX.Element => {
  const {
    data,
    dataFlat,
    isSaved,
    handleChange,
    handleSave,
    setFormValues,
    getStandardTextInputAttributes,
    getFieldValue,
  } = usePagesEdit();

  useEffect(() => {
    const ret = dataFlat?.map((item) => {
      return {
        id: item.tempId,
        name: item.name,
        parent: item.parentId?.toString() || '0',
        seq: item.seq?.toString(),
        sortby: item.sortby,
        type: item.type,
        tempId: item.id,
      };
    });
    if (ret) {
      setFormValues(ret);
    }
  }, [dataFlat, setFormValues]);

  const renderItem = useCallback(
    (item: MenuItem | undefined, level: number): JSX.Element | null => {
      if (!item) {
        return null;
      }

      return (
        <React.Fragment key={item.id}>
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
            {level === 0 ? (
              <StyledTd1>{item.name}</StyledTd1>
            ) : level === 1 ? (
              <StyledTd2>{item.name}</StyledTd2>
            ) : (
              <StyledTd3>{item.name}</StyledTd3>
            )}
            <td>
              {item.type !== 'root' ? (
                <TextInput
                  {...getStandardTextInputAttributes(item.tempId, 'parent')}
                  autoCapitalize="off"
                  enterKeyHint="next"
                  // errorText={getFieldErrors(`parentId${item.id}`)}
                  // errorTextShort="Please enter a short title"
                  // hasError={hasError(`parentId${item.id}`)}
                  inputMode="text"
                  onChange={(e) =>
                    handleChange(item.tempId, 'parent', e.target.value)
                  }
                  required={true}
                  spellCheck={true}
                />
              ) : null}
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes(item.tempId, 'seq')}
                autoCapitalize="off"
                enterKeyHint="next"
                // errorText={getFieldErrors(`parentId${item.id}`)}
                // errorTextShort="Please enter a short title"
                // hasError={hasError(`parentId${item.id}`)}
                inputMode="numeric"
                onChange={(e) =>
                  handleChange(item.tempId, 'seq', e.target.value)
                }
                required={true}
                spellCheck={true}
              />
            </td>
            <td>{getFieldValue(item.tempId, 'sortby')}</td>
            <td>{item.tempId}</td>
            {/* <td>
              {item.type !== 'page' ? (
                <TextInput
                  {...getStandardTextInputAttributes(item.tempId, 'sortby')}
                  autoCapitalize="off"
                  enterKeyHint="next"
                  // errorText={getFieldErrors(`parentId${item.id}`)}
                  // errorTextShort="Please enter a short title"
                  // hasError={hasError(`parentId${item.id}`)}
                  inputMode="text"
                  onChange={(e) =>
                    handleChange(item.tempId, 'sortby', e.target.value)
                  }
                  required={true}
                  spellCheck={true}
                />
              ) : null}
            </td> */}
            <td>
              {item.type} - {level}
            </td>
          </StyledTr>
          {item.items?.map((x) => renderItem(x, level + 1))}
        </React.Fragment>
      );
    },
    [getStandardTextInputAttributes, handleChange],
  );

  return (
    <>
      <Meta title="Pages" />
      <StyledMain>
        <StyledMain.Section>
          <PageTitle title="Pages">
            <StyledMenu>
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
                <th>Parent</th>
                <th>Seq</th>
                <th>Sortby</th>
                <th>Type</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((item) => (
                <React.Fragment key={item.id}>
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

export default PagesPage;

const StyledTr = styled.tr`
  td {
    padding: 3px 15px;
  }
`;
const StyledTd1 = styled.td`
  padding-left: 0px;
`;
const StyledTd2 = styled.td`
  padding-left: 30px;
`;
const StyledTd3 = styled.td`
  padding-left: 60px;
`;
const StyledSaveButton = styled(StyledPlainButton)`
  font-weight: bold;
`;
