import { LoadingWrapper } from 'components/common/Loading';
import { PageTitle } from 'components/common/PageTitle';
import { Meta } from 'components/common/Meta';
import React, { useDeferredValue } from 'react';
import { StyledLink } from 'components/ui/Form/StyledLink';
import StyledMain from 'components/common/StyledMain';
import { useAxios } from 'hooks/Axios';
import { ServiceUrl } from 'utils';
import { Pages } from 'services/types';

const PagesPage = (): JSX.Element => {
  const { data, isLoading, error } = useAxios<Pages>(
    `${ServiceUrl.ENDPOINT_MENUS}`,
  );

  const deferredData = useDeferredValue(data);

  return (
    <>
      <Meta title="Pages" />
      <StyledMain>
        <LoadingWrapper error={error} isLoading={isLoading}>
          <StyledMain.Section>
            <PageTitle title="Pages">
              {' '}
              <StyledLink data-testid="nav-new" to="/admin/page/edit">
                New
              </StyledLink>
            </PageTitle>
            <table>
              <thead>
                <tr>
                  <th />
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {deferredData?.items?.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr>
                      <td>{item.name}</td>
                      <td>
                        <StyledLink to={`/admin/page/edit/${item.id}`}>
                          {item.id}
                        </StyledLink>
                      </td>
                    </tr>
                    {item.items?.map((x) => (
                      <tr key={x.id}>
                        <td />
                        <td>
                          <StyledLink to={`/admin/page/edit/${x.id}`}>
                            {x.name}
                          </StyledLink>
                        </td>
                        <td> {x.id}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </StyledMain.Section>
        </LoadingWrapper>
      </StyledMain>
    </>
  );
};

export default PagesPage;
