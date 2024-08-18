import StyledMain from 'components/common/StyledMain/StyledMain';
import Meta from 'components/ui/Meta/Meta';
import PageTitle from 'components/ui/PageTitle/PageTitle';

const MusicPage = (): JSX.Element => {
  const title = 'YouTube Videos';

  return (
    <>
      <Meta title={title} />
      <StyledMain>
        <PageTitle title={title} />
        <section>
          <p>These are some of my favorite YouTube videos.</p>
          {/* <LoadingWrapper error={error} isLoading={isLoading}>
            <List
              height={600}
              itemCount={data?.items?.length ? data?.items?.length : 0}
              itemData={itemData}
              itemSize={220}
              overscanCount={15}
              width="100%">
              {ItemRenderer}
            </List>

          </LoadingWrapper> */}
        </section>
      </StyledMain>
    </>
  );
};

export default MusicPage;
