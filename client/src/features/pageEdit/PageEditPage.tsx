import { useActionState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Input from 'components/Input/Input';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import Layout from 'features/layouts/Layout/Layout';
import { ServiceUrl } from 'lib/utils/constants';
import { getParamIdAsString } from 'lib/utils/helpers';
import { useParams } from 'react-router-dom';
import { Page, PageEdit, PageEditSchema } from 'types/Page';
import axios from 'axios';

const PageEditPage = (): React.JSX.Element => {
  const { id } = useParams();

  const currentId = getParamIdAsString(id);

  const { data, failureReason, isError, isPending } = useQuery({
    queryFn: async () => {
      const response = await fetch(`${ServiceUrl.ENDPOINT_PAGE}/${currentId}`);
      return (await response.json()) as Page;
    },
    queryKey: ['page-edit', currentId],
    retry: 3,
  });

  const title = 'New Page';

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return axios.post(ServiceUrl.ENDPOINT_PAGE, data);
    },
  });

  async function saveData(_prevState: any, formData: any) {
    console.log('here');
    const fde = formData.entries();
    // const payload = Object.fromEntries(fde);
    // const valid = PageEditSchema.safeParse(payload);
    // if (!valid.success) {
    //   console.log('Validation failed', valid.error.format());
    //   return;
    // }
    mutation.mutate(fde);
    // //const { data } = await axios.post(payload);

    // return data;
  }

  const [response, submitAction] = useActionState(saveData, null);

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <Layout.Section>
          <PageTitle title={title}>
            <StyledLink data-testid="nav-list" to="/admin/pages">
              List
            </StyledLink>
            <StyledLink data-testid="nav-new" to="/admin/page/edit">
              New
            </StyledLink>
          </PageTitle>
          <LoadingWrapper
            error={failureReason?.message}
            isError={isError}
            isPending={isPending}>
            {/* <PageEditForm data={data} /> */}
            <form action={submitAction}>
              <Input.Text
                id="title"
                labelProps={{ label: 'Title' }}
                minLength={10}
                //    onBlur={handeNameOnBlur}
                //  onChange={handleChange}
                placeholder="Enter a title"
                required
                spellCheck
                value={data?.name || ''}
                // value={formValues.name}
              />
              <button type="submit">Submit</button>
              {/* {response.message && <p>{response.message}</p>}
              {response.error && <p className="error">An error occurred.</p>} */}
            </form>
            {/* <PageEditForm data={data} /> */}
          </LoadingWrapper>
        </Layout.Section>
      </Layout.Main>
    </>
  );
};

export default PageEditPage;
