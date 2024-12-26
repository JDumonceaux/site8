import React, { Suspense } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Input from 'components/Input/Input';
import Layout from 'components/layouts/Layout/Layout';
import MenuBar from 'features/imagesEdit/MenuBar';
import { styled } from 'styled-components';

import ItemDetail from './ItemDetail';
import RightMenu from './RightMenu';
import useArtists from './useArtists';
import useItems from './useItems';
import useItemsAddPage from './useItemsAddPage';

const ItemsAddPage = (): React.JSX.Element => {
  const {
    artistId,
    data,
    error,
    getFieldValue,
    handleChange,
    handleClear,
    handleFilterChange,
    handleSubmit,
    isLoading,
  } = useItemsAddPage();

  const { artistsIndexed, locationsIndexed, namesIndexed, periodsIndexed } =
    useItems();

  const { artistsAsListItem } = useArtists();

  const title = 'Add Items';

  return (
    <>
      <Meta title={title} />
      <Layout.TitleFixed>
        <PageTitle title={title}>
          <MenuBar handleClear={handleClear} handleSubmit={handleSubmit} />
        </PageTitle>
      </Layout.TitleFixed>
      <Layout.Flex>
        <Layout.Main>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <Input.Select
              dataList={artistsAsListItem}
              onChange={handleFilterChange}
              placeholder="Artist"
              value={artistId}
            />
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
            <RightMenu artistId={artistId} />
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
