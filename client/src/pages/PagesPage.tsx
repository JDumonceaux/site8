'use client';
import React, { useDeferredValue, useEffect } from 'react';

import { useAxios } from 'hooks/Axios';
import { ServiceUrl } from 'utils';
import { Pages } from 'services/types';
import StyledLink from 'components/common/Link/StyledLink/StyledLink';
import { Meta, LoadingWrapper, PageTitle } from 'components';
import StyledMain from 'components/common/StyledMain/StyledMain';

const PagesPage = (): JSX.Element => {
  const { data, isLoading, error, fetchData } = useAxios<Pages>();
  const deferredData = useDeferredValue(data);

  useEffect(() => {
    fetchData(`${ServiceUrl.ENDPOINT_MENUS}`);
  }, []);

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
                {deferredData?.level1?.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr>
                      <td>{item.name}</td>
                      <td>
                        <StyledLink to={`/admin/page/edit/${item.id}`}>
                          {item.id}
                        </StyledLink>
                      </td>
                    </tr>
                    {/* {item?.map((x) => (
                      <tr key={x.id}>
                        <td />
                        <td>
                          <StyledLink to={`/admin/page/edit/${x.id}`}>
                            {x.name}
                          </StyledLink>
                        </td>
                        <td> {x.id}</td>
                      </tr>
                    ))} */}
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
