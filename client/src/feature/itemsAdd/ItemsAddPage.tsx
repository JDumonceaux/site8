import React, { Suspense } from 'react';

import Button from 'components/core/Button/Button';
import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import PageTitle from 'components/core/PageTitle/PageTitle';
import { IconMenuItem } from 'components/IconMenu/IconMenuItem';
import Layout from 'components/layouts/Layout/Layout';
import MenuBar from 'feature/imagesEdit/MenuBar';
import { styled } from 'styled-components';

import ItemDetail from './ItemDetail';
import RightMenu from './RightMenu';
import useItems from './useItems';
import useItemsAddPage from './useItemsAddPage';

const ItemsAddPage = (): React.JSX.Element => {
  const {
    currentFilter,
    data,
    error,
    getFieldValue,
    handleChange,
    handleClear,
    handleSetFilter,
    handleSubmit,
    isLoading,
  } = useItemsAddPage();

  const { artistsIndexed, locationsIndexed, namesIndexed, periodsIndexed } =
    useItems();

  const title = 'Add Items';

  return (
    <>
      <title>{title}</title>
      <Layout.TitleFixed>
        <PageTitle title={title}>
          <MenuBar handleClear={handleClear} handleSubmit={handleSubmit}>
            <IconMenuItem key="set-filter">
              <Button onClick={handleSetFilter}>handleSetFilter</Button>
            </IconMenuItem>
          </MenuBar>
        </PageTitle>
      </Layout.TitleFixed>
      <Layout.Flex>
        <Layout.Main>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <StyledForm noValidate onSubmit={handleSubmit}>
              {data.map((item) => (
                <ItemDetail
                  artists={artistsIndexed}
                  getFieldValue={getFieldValue}
                  item={item}
                  key={item.lineId}
                  locations={locationsIndexed}
                  names={namesIndexed}
                  onChange={handleChange}
                  periods={periodsIndexed}
                />
              ))}
            </StyledForm>
          </LoadingWrapper>
        </Layout.Main>

        <Layout.Aside>
          <Suspense fallback={<div>Loading...</div>}>
            <RightMenu currentFilter={currentFilter} />
          </Suspense>
        </Layout.Aside>
      </Layout.Flex>
    </>
  );
};

export default ItemsAddPage;

const StyledForm = styled.form`
  width: 100%;
`;
