'use client';
import React, { useCallback, useEffect } from 'react';
import StyledLink from 'components/common/Link/StyledLink/StyledLink';
import { Meta, LoadingWrapper, PageTitle } from 'components';
import StyledMain from 'components/common/StyledMain/StyledMain';
import useMenu from 'hooks/useMenu';
import { MenuEntry } from 'services/types/MenuEntry';
import { styled } from 'styled-components';
import { TextInput } from 'components/form/input';
import usePagesEdit from 'hooks/usePagesEdit';

const PagesPage = (): JSX.Element => {
  const { data, fetchData, isLoading, error } = useMenu();
  const { formValues, getFieldErrors, handleChange, hasError } = usePagesEdit();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderItem = useCallback(
    (item: MenuEntry | undefined, level: number): JSX.Element | null => {
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
                autoCapitalize="off"
                enterKeyHint="next"
                errorText={getFieldErrors(`parentId${item.id}`)}
                errorTextShort="Please enter a short title"
                hasError={hasError(`parentId${item.id}`)}
                id={`parentId${item.id}`}
                inputMode="text"
                onChange={handleChange}
                required={true}
                spellCheck={true}
                value={formValues[`parentId${item.id}`]}
              />
            </td>
            <td>{item.seq}</td>
            <td>{item.type === 'menu' ? item.sortby : null}</td>
            <td>
              {item.type} - {level}
            </td>
          </tr>
          {item.items?.map((x) => renderItem(x, level + 1))}
        </React.Fragment>
      );
    },
    [],
  );

  return (
    <>
      <Meta title="Pages" />
      <StyledMain>
        <LoadingWrapper error={error} isLoading={isLoading}>
          <StyledMain.Section>
            <PageTitle title="Pages">
              <StyledLink data-testid="nav-new" to="/admin/page/edit">
                New
              </StyledLink>
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
                {data?.items?.map((item) => (
                  <React.Fragment key={item.id}>
                    {renderItem(item, 0)}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </StyledMain.Section>
        </LoadingWrapper>
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
