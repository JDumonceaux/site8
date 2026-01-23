import type { JSX } from 'react';
import { useParams } from 'react-router-dom';

import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import Layout from '@features/layouts/layout/Layout';
import { logError } from '@lib/utils/errorHandler';
import Items from './Items';
import Skeleton from './Skeleton';
import TravelMenu from './TravelMenu';
import useTravel from './useTravel';
import { useTravelFiltering } from './useTravelFiltering';
import styled from 'styled-components';

const TravelPage = (): JSX.Element => {
  const { city, country, item } = useParams<{
    city?: string;
    country?: string;
    item?: string;
  }>();

  const { data, error, isError, isLoading } = useTravel();

  const { filteredData, pageTitle, sortedCountryGroups } = useTravelFiltering({
    city,
    country,
    data,
    item,
  });

  if (isError && error != null) {
    logError(error, {
      action: 'loadDestinations',
      componentName: 'TravelPage',
    });
  }

  return (
    <>
      <Meta
        description="Explore amazing destinations around the world."
        title={pageTitle}
      />
      <Layout.TwoColumn>
        <Layout.Menu>
          <TravelMenu />
        </Layout.Menu>
        <Layout.Content>
          <Layout.Article>
            <PageTitle title={pageTitle} />
            <Layout.Section>
              {isLoading ? (
                <Skeleton />
              ) : isError && error != null ? (
                <div>Error loading travel destinations</div>
              ) : sortedCountryGroups == null ? (
                <Items data={filteredData} />
              ) : (
                <>
                  {sortedCountryGroups.map(
                    ({ countryName, data: groupData }) => (
                      <CountryGroup key={countryName}>
                        <CountryHeading>{countryName}</CountryHeading>
                        <Items data={groupData} />
                      </CountryGroup>
                    ),
                  )}
                </>
              )}
            </Layout.Section>
          </Layout.Article>
        </Layout.Content>
      </Layout.TwoColumn>
    </>
  );
};

export default TravelPage;

const CountryGroup = styled.div`
  margin-bottom: 2rem;
`;

const CountryHeading = styled.h2`
  color: var(--text-primary, #333);
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-color, #e0e0e0);
`;
