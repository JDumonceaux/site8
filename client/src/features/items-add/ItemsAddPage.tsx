import { type JSX, Suspense } from 'react';

import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import Input from '@components/ui/input/Input';
import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import MenuBar from '@features/images-edit/MenuBar';
import Layout from '@features/layouts/layout/Layout';
import type { ItemAddExt } from './ItemAdd';
import ItemDetail from './ItemDetail';
import RightMenu from './RightMenu';
import useArtists from './useArtists';
import useItems from './useItems';
import useItemsAddPage from './useItemsAddPage';
import styled from 'styled-components';

const ItemsAddPage = (): JSX.Element => {
  const {
    actionState,
    artistId,
    data,
    formAction,
    handleChange,
    handleClear,
    handleFilterChange,
  } = useItemsAddPage();

  const { locationsIndexed, periodsIndexed, titlesIndexed } = useItems();

  const { artistsAsListItem } = useArtists();

  const title = 'Add Items';

  return (
    <>
      <Meta title={title} />
      <Layout.TitleFixed>
        <PageTitle title={title}>
          <MenuBar handleClear={handleClear} />
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
              action={formAction}
              noValidate
            >
              {data.map((item: ItemAddExt) => (
                <ItemDetail
                  item={item}
                  key={item.lineId}
                  locations={locationsIndexed}
                  names={titlesIndexed}
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
