import { useState } from 'react';
import PageTitle from '../../components/common/PageTitle/PageTitle';

import SEO from '../../components/common/SEO/SEO';

import { z } from 'zod';

const pageSchema = z.object({
  title: z.string(),
  content: z.string(),
  // Add more properties from IPage here
});

type PageFormValues = z.infer<typeof pageSchema>;

export default function PageEdit() {
  //const id = 0;
  // const { data, loading, error } = useFetch<IPage>(
  //   `${ServiceUrl.ENDPOINT_PAGE}/${id}`
  // );

  const title = 'Page Edit';

  const [formValues, setFormValues] = useState<PageFormValues>({
    title: '',
    content: '',
    // Initialize other properties from IPage here
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <>
      <SEO title={title} />
      <main className='main-content'>
        {/* <LoadingWrapper error={error} isLoading={loading}> */}
        <PageTitle title={title} />
        <section className='section'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              id='title'
              name='title'
              value={formValues.title}
              onChange={handleChange}
            />

            <label htmlFor='content'>Content</label>
            <textarea
              id='content'
              name='content'
              value={formValues.content}
              onChange={handleChange}
            />

            {/* Add more form inputs for other properties from IPage here */}

            <button type='submit'>Submit</button>
          </form>
        </section>
        {/* </LoadingWrapper> */}
      </main>
    </>
  );
}
