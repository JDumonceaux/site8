import { useEffect } from 'react';
import PageTitle from '../components/common/PageTitle/PageTitle';
import usePage from '../services/hooks/usePage';
import SEO from '../components/common/SEO';
import Resources from '../components/common/Resources';

interface IProps {
  id: number;
  pageTitle: string;
}

export default function GenericPage({ id, pageTitle }: IProps) {
  const { data, fetchData } = usePage();

  const title = data?.item?.long_title || pageTitle;

  console.log('id', id);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  return (
    <>
      <SEO title={title} />
      <main className='main-content'>
        <PageTitle title={title} />
        <section className='section'>
          <div
            dangerouslySetInnerHTML={{
              __html: data?.text ? data.text : '',
            }}
          />
        </section>
        <Resources id={id} />
      </main>
      <aside className='right-sidebar'></aside>
    </>
  );
}
