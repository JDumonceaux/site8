import React, { Suspense, useState } from 'react';

import Button from 'components/core/Button/Button';
import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import { IconMenuItem } from 'components/IconMenu/IconMenuItem';
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
    data,
    error,
    getFieldValue,
    handleChange,
    handleClear,
    handleSetFilter,
    handleSubmit,
    isLoading,
  } = useItemsAddPage();
  const [artistId, setArtistId] = useState('');

  const { artistsIndexed, locationsIndexed, namesIndexed, periodsIndexed } =
    useItems();

  const { artistsAsListItem } = useArtists();

  const handleFilterChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setArtistId(event.target.value);
    },
    [],
  );

  const title = 'Add Items';

  return (
    <>
      <Meta title={title} />
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
