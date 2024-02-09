import { PageTitle, SEO } from 'components/common';
import { TextInput } from 'components/ui/TextInput';
import { useState } from 'react';
import { IPage } from 'services/api/models/pages/IPage';
import usePost from 'services/hooks/usePost';
import { ServiceUrl } from 'utils';
import { z } from 'zod';

const pageSchema = z.object({
  id: z.number(),
  short_title: z.string({ required_error: 'Short Title is required.' }).min(1).trim(),
  long_title: z.string({ required_error: 'Long Title is required.' }).min(1).trim(),
  edit_date: z.string().trim().optional(),
  resources: z.boolean(),
  text: z.string({ required_error: 'Text is required.' }).min(1).trim(),
  parent: z.string().trim().optional(),
  reading_time: z.string().trim().optional(),
  readability_score: z.string().trim().optional(),
});

type PageFormValues = z.infer<typeof pageSchema>;

export default function PageEdit(): JSX.Element {
  //const id = 0;
  const { data, loading, error, postData } = usePost<IPage>(
    `${ServiceUrl.ENDPOINT_PAGE}`,
  );

  const title = 'Page Edit';

  const [formValues, setFormValues] = useState<PageFormValues>({
    id: 0,
    short_title: '',
    long_title: '',
    edit_date: '',
    resources: false,
    parent: '',
    text: '',
    reading_time: '',
    readability_score: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    const { edit_date, parent, ...rest } = formValues;
    postData(rest);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
      <main className="main-content">
        {/* <LoadingWrapper error={error} isLoading={loading}> */}
        <PageTitle title={title} />
        <section className="section">
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Short Title"
              id="short_title"
              value={formValues.short_title}
              onChange={handleChange}
            />
            <TextInput
              label="Long Title"
              id="long_title"
              value={formValues.long_title}
              onChange={handleChange}
            />
            <TextInput
              label="Edit Date"
              id="edit_date"
              value={formValues.edit_date}
              onChange={handleChange}
            />
            <label htmlFor="resources">Resources</label>
            <input
              type="checkbox"
              id="resources"
              name="resources"
              checked={formValues.resources}
              onChange={handleChange}
            />
            <TextInput
              label="Parent"
              id="parent"
              value={formValues.parent}
              onChange={handleChange}
            />
            <TextInput
              label="Reading Time"
              id="reading_time"
              value={formValues.reading_time}
              onChange={handleChange}
            />
            <TextInput
              label="Readability Score"
              id="readability_score"
              value={formValues.readability_score}
              onChange={handleChange}
            />
            <label htmlFor="text">Text</label>
            <textarea
              id="text"
              name="text"
              value={formValues.text}
              onChange={handleChange}
            />

            <button type="submit">Submit</button>
          </form>
        </section>
        {/* </LoadingWrapper> */}
      </main>
    </>
  );
}
