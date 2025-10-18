import { Suspense, type JSX } from 'react';
import styled from 'styled-components';

import LoadingWrapper from '@components/core/Loading/LoadingWrapper';
import Meta from '@components/core/Meta/Meta';
import PageTitle from '@components/core/PageTitle/PageTitle';
import Input from '@components/Input/Input';
import Layout from '@features/layouts/Layout/Layout';
import MenuBar from '@features/imagesEdit/MenuBar';

import ItemDetail from './ItemDetail';
import RightMenu from './RightMenu';
import useArtists from './useArtists';
import useItems from './useItems';
import useItemsAddPage from './useItemsAddPage';

const ItemsAddPage = (): JSX.Element => {
  const {
    artistId,
    data,
    getFieldValue,
    handleChange,
    handleClear,
    handleFilterChange,
    handleSubmit,
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
          <MenuBar
            handleClear={handleClear}
            handleSubmit={handleSubmit}
          />
        </PageTitle>
      </Layout.TitleFixed>

      <Layout.Flex>
        <Layout.Main>
          <LoadingWrapper>
            <Input.Select
              dataList={artistsAsListItem}
              onChange={handleFilterChange}
              placeholder="Artist"
              value={artistId}
            />
            <StyledForm
              noValidate
              onSubmit={handleSubmit}
            >
              {data.map((item) => (
                <ItemDetail
                  key={item.lineId}
                  item={item}
                  artists={artistsIndexed}
                  locations={locationsIndexed}
                  names={namesIndexed}
                  periods={periodsIndexed}
                  getFieldValue={getFieldValue}
                  onChange={handleChange}
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

ItemsAddPage.displayName = 'ItemsAddPage';
export default ItemsAddPage;

const StyledForm = styled.form`
  width: 100%;
`;
