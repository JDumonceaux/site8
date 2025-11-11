import { type JSX, Suspense } from 'react';

import MenuBar from '@/features/images-edit/MenuBar';
import Layout from '@features/layouts/Layout/Layout';
import styled from 'styled-components';
import LoadingWrapper from '@/components/core/loading/LoadingWrapper';
import Meta from '@/components/core/meta/Meta';
import PageTitle from '@/components/core/page-title/PageTitle';
import Input from '@/components/input/Input';
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
              value={artistId}
              onChange={handleFilterChange}
              placeholder="Artist"
            />
            <StyledForm
              noValidate
              onSubmit={handleSubmit}
            >
              {data.map((item) => (
                <ItemDetail
                  key={item.lineId}
                  artists={artistsIndexed}
                  getFieldValue={getFieldValue}
                  item={item}
                  names={namesIndexed}
                  locations={locationsIndexed}
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

ItemsAddPage.displayName = 'ItemsAddPage';
export default ItemsAddPage;

const StyledForm = styled.form`
  width: 100%;
`;
