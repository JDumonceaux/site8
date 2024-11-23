import Reactfrom 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'components/layouts/Layout/Layout';
import { styled } from 'styled-components';

import ImageItem from './Item';
import useItemEditPage from './useItemsEditPage';

const ItemEditPage = (): React.JSX.Element => {
  const title = 'Edit Images';

  const {
    artistData,
    currentFilter,
    currentFolder,
    data,
    error,
    getFieldValue,
    handleChange,
    handleDelete,
    handleFilterSelect,
    handleFolderChange,
    handleRefresh,
    handleScan,
    handleSubmit,
    isLoading,
  } = useItemEditPage();

  return (
    <>
      <Meta title={title} />
      <Layout.TitleFixed>
        <PageTitle title={title}>

        </PageTitle>
      </Layout.TitleFixed>
      <Layout.Flex>
        <Layout.Main>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <StyledForm noValidate onSubmit={handleSubmit}>
              {data.map((item) => (
                <ImageItem
                  artistData={artistData}
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

export default ItemEditPage;

const StyledForm = styled.form`
  width: 100%;
`;
