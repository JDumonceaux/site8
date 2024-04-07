import { LoadingWrapper } from 'components/common/Loading';
import { PageTitle } from 'components/common/PageTitle';
import { Meta } from 'components/common/Meta';
import React, { useDeferredValue, useEffect } from 'react';
import { StyledLink } from 'components/ui/Form/StyledLink';
import StyledMain from 'components/common/StyledMain';
import useMenu from 'hooks/useMenu';

const PagesPage = (): JSX.Element => {
  const { data, isLoading, error, fetchData } = useMenu();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deferredData = useDeferredValue(data);

  console.log('Data', data);

  return (
    <>
      <Meta title="Pages" />
      <StyledMain>
        <LoadingWrapper error={error} isLoading={isLoading}>
          <StyledMain.Section>
            <PageTitle title="Pages" />
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
