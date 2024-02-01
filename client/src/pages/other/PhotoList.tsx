import { useEffect } from 'react';
import { APP_NAME } from '../../utils/constants';
import PageTitle from '../../components/common/PageTitle/PageTitle';
import LoadingWrapper from '../../components/common/Loading/LoadingWrapper';
import usePhotos from '../../services/hooks/usePhotos';
import './photoList.css';
import SEO from '../../components/common/SEO/SEO';

export default function PhotoList() {
  const title = 'Photos';
  const { data, loading, error, fetchData } = usePhotos();

  useEffect(() => {
    document.title = `${APP_NAME} - ${title}`;
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <SEO title={title} />
      <main className='main-content'>
        <PageTitle title={title} />
        <section className='section'>
          <LoadingWrapper isLoading={loading} error={error}>
            <ul>
              {data?.items?.map((item) => {
                return (
                  <li key={item.id}>
                    <a
                      href={item.url}
                      data-fancybox
                      data-caption={item.description}
                    >
                      <img
                        src={item.url}
                        alt={item.description}
                        loading='lazy'
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </LoadingWrapper>
        </section>
      </main>
      <aside className='right-sidebar'></aside>
    </>
  );
}
