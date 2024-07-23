import Meta from 'components/common/Meta/Meta';
import PageTitle from 'components/common/PageTitle/PageTitle';
import './musicList.css';

import StyledMain from 'components/common/StyledMain/StyledMain';

const MusicList = (): JSX.Element => {
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

export default MusicList;
