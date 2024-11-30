import React from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'components/layouts/Layout/Layout';
import { styled } from 'styled-components';

import ItemDetail from './ItemDetail';
import useItemsEditPage from './useItemsAddPage';

const ItemsAddPage = (): React.JSX.Element => {
  const title = 'Add Items';

  const {
    data,
    error,
    getFieldValue,
    handleChange,
    handleDelete,
    handleSubmit,
    isLoading,
  } = useItemsEditPage();

  return (
    <>
      <Meta title={title} />
      <Layout.TitleFixed>
        <PageTitle title={title} />
      </Layout.TitleFixed>
      <Layout.Flex>
        <Layout.Main>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <StyledForm noValidate onSubmit={handleSubmit}>
              {data.map((item) => (
                <ItemDetail
                  getFieldValue={getFieldValue}
                  item={item}
                  key={item.lineId}
                  onChange={handleChange}
                  onDelete={handleDelete}
                />
              ))}
            </StyledForm>
          </LoadingWrapper>
        </Layout.Main>
      </Layout.Flex>
    </>
  );
};

export default ItemsAddPage;

const StyledForm = styled.form`
  width: 100%;
`;
