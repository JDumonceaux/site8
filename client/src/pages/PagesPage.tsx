'use client';
import React, { useCallback } from 'react';
import StyledLink from 'components/common/Link/StyledLink/StyledLink';
import { Meta, LoadingWrapper, PageTitle, StyledPlainButton } from 'components';
import StyledMain from 'components/common/StyledMain/StyledMain';
import { styled } from 'styled-components';
import { TextInput } from 'components/form/input';
import usePagesEdit from 'hooks/usePagesEdit';
import StyledMenu from 'components/common/StyledMain/StyledMenu';
import { Page } from 'services/types';

const PagesPage = (): JSX.Element => {
  const {
    data,
    error,
    isLoading,
    isSaved,
    handleChange,
    handleSave,
    getStandardTextInputAttributes,
  } = usePagesEdit();

  const renderItem = useCallback(
    (item: Page | undefined, level: number): JSX.Element | null => {
      if (!item) {
        return null;
      }

      return (
        <React.Fragment key={item.id}>
          <tr>
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
              <TextInput
                {...getStandardTextInputAttributes(item.id, 'parent')}
                autoCapitalize="off"
                enterKeyHint="next"
                // errorText={getFieldErrors(`parentId${item.id}`)}
                // errorTextShort="Please enter a short title"
                // hasError={hasError(`parentId${item.id}`)}
                inputMode="text"
                onChange={(e) =>
                  handleChange(item.id, 'parent', e.target.value)
                }
                required={true}
                spellCheck={true}
              />
            </td>
            <td>
              {' '}
              <TextInput
                {...getStandardTextInputAttributes(item.id, 'seq')}
                autoCapitalize="off"
                enterKeyHint="next"
                // errorText={getFieldErrors(`parentId${item.id}`)}
                // errorTextShort="Please enter a short title"
                // hasError={hasError(`parentId${item.id}`)}
                inputMode="numeric"
                onChange={(e) => handleChange(item.id, 'seq', e.target.value)}
                required={true}
                spellCheck={true}
              />
            </td>
            <td>
              {item.type === 'menu' ? (
                <TextInput
                  {...getStandardTextInputAttributes(item.id, 'sortby')}
                  autoCapitalize="off"
                  enterKeyHint="next"
                  // errorText={getFieldErrors(`parentId${item.id}`)}
                  // errorTextShort="Please enter a short title"
                  // hasError={hasError(`parentId${item.id}`)}
                  inputMode="text"
                  onChange={(e) =>
                    handleChange(item.id, 'sortby', e.target.value)
                  }
                  required={true}
                  spellCheck={true}
                />
              ) : null}
            </td>
            <td>
              {item.type} - {level}
            </td>
          </tr>
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
            <LoadingWrapper error={error} isLoading={isLoading}>
              <tbody>
                {data?.map((item) => (
                  <React.Fragment key={item.id}>
                    {renderItem(item, 0)}
                  </React.Fragment>
                ))}
              </tbody>
            </LoadingWrapper>
          </table>
        </StyledMain.Section>
      </StyledMain>
    </>
  );
};

export default PagesPage;

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
