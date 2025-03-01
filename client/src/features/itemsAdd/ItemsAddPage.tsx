import React, { Suspense, useCallback, useMemo } from 'react';

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

  const memoArtistsAsListItem = useMemo(
    () => artistsAsListItem,
    [artistsAsListItem],
  );

  const memoHandleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleFilterChange(event);
    },
    [handleFilterChange],
  );

  const memoHandleClear = useCallback(() => {
    handleClear();
  }, [handleClear]);

  const memoHandleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      handleSubmit(event);
    },
    [handleSubmit],
  );

  const memoGetFieldValue = useCallback(
    (field: string) => getFieldValue(field),
    [getFieldValue],
  );

  const memoHandleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(event);
    },
    [handleChange],
  );

  const memoArtistsIndexed = useMemo(() => artistsIndexed, [artistsIndexed]);
  const memoLocationsIndexed = useMemo(
    () => locationsIndexed,
    [locationsIndexed],
  );
  const memoNamesIndexed = useMemo(() => namesIndexed, [namesIndexed]);
  const memoPeriodsIndexed = useMemo(() => periodsIndexed, [periodsIndexed]);

  return (
    <>
      <Meta title={title} />
      <Layout.TitleFixed>
        <PageTitle title={title}>
          <MenuBar
            handleClear={memoHandleClear}
            handleSubmit={memoHandleSubmit}
          />
        </PageTitle>
      </Layout.TitleFixed>
      <Layout.Flex>
        <Layout.Main>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <Input.Select
              dataList={memoArtistsAsListItem}
              onChange={memoHandleFilterChange}
              placeholder="Artist"
              value={artistId}
            />
            <StyledForm noValidate onSubmit={memoHandleSubmit}>
              {data.map((item) => (
                <ItemDetail
                  artists={memoArtistsIndexed}
                  getFieldValue={memoGetFieldValue}
                  item={item}
                  key={item.lineId}
                  locations={memoLocationsIndexed}
                  names={memoNamesIndexed}
                  onChange={memoHandleChange}
                  periods={memoPeriodsIndexed}
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
