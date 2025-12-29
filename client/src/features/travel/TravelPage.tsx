import type { JSX } from 'react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import PageTitle from '@components/core/page/PageTitle';
import Layout from '@features/layouts/layout/Layout';
import { logError } from '@lib/utils/errorLogger';
import Items from './Items';
import TravelMenu from './TravelMenu';
import useTravel from './useTravel';

/**
 * Slugify helper to match URL parameters to place data
 */
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const TravelPage = (): JSX.Element => {
  const { country, city, item } = useParams<{
    country?: string;
    city?: string;
    item?: string;
  }>();

  const { data, error, isError, isLoading } = useTravel();

  if (isError && error) {
    logError(error, {
      componentName: 'TravelPage',
      action: 'loadDestinations',
    });
  }

  // Filter data based on URL parameters
  const filteredData = useMemo(() => {
    if (!data) return data;

    let filtered = data.items;

    // Filter by country
    if (country) {
      filtered = filtered.filter(
        (place) => slugify(place.country || '') === country,
      );
    }

    // Filter by city
    if (city) {
      filtered = filtered.filter((place) => slugify(place.city || '') === city);
    }

    // Filter by specific item
    if (item) {
      filtered = filtered.filter((place) => slugify(place.name) === item);
    }

    return { ...data, items: filtered };
  }, [data, country, city, item]);

  // Determine page title based on URL parameters
  const pageTitle = useMemo(() => {
    if (item && filteredData?.items[0]) {
      return filteredData.items[0].name;
    }
    if (city && filteredData?.items[0]) {
      return `${filteredData.items[0].city}, ${filteredData.items[0].country}`;
    }
    if (country && filteredData?.items[0]) {
      return filteredData.items[0].country;
    }
    return 'Travel Destinations';
  }, [country, city, item, filteredData]);

  return (
    <>
      <title>{pageTitle}</title>
      <meta
        name="description"
        content="Explore amazing destinations around the world."
      />
      <StyledPageLayout>
        <StyledSidebar>
          <TravelMenu />
        </StyledSidebar>
        <Layout.Main>
          <PageTitle title={pageTitle} />
          <section>
            <LoadingWrapper
              error={error}
              isError={isError}
              isLoading={isLoading}
            >
              <Items data={filteredData} />
            </LoadingWrapper>
          </section>
        </Layout.Main>
      </StyledPageLayout>
    </>
  );
};

export default TravelPage;

const StyledPageLayout = styled.div`
  display: flex;
  min-height: 100vh;
  gap: 1rem;
`;

const StyledSidebar = styled.aside`
  width: 300px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
`;
