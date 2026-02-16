import type { JSX } from 'react';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import Meta from '@components/meta/Meta';
import StickyMenuWrapper from '@components/layout/StickyMenuWrapper';
import PageTitle from '@components/page/PageTitle';
import IconButton from '@components/button/icon-button/IconButton';
import { AddIcon } from '@components/icons';
import useSnackbar from '@app/snackbar/useSnackbar';
import Layout from '@features/layouts/layout/Layout';
import { logError } from '@lib/utils/errorHandler';
import type { Place } from '@site8/shared';
import styled from 'styled-components';
import TravelItemEditDialog from './edit/dialog/TravelItemEditDialog';
import Items from './Items';
import Skeleton from './Skeleton';
import TravelMenu from './TravelMenu';
import useTravel from './useTravel';
import { useTravelFiltering } from './useTravelFiltering';
import useTravelMutations from './useTravelMutations';

const TravelPage = (): JSX.Element => {
  const { city, country, item } = useParams<{
    city?: string;
    country?: string;
    item?: string;
  }>();

  const { data, error, isError, isLoading } = useTravel();
  const { setErrorMessage, setMessage } = useSnackbar();
  const [editingItem, setEditingItem] = useState<null | Place>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { filteredData, pageTitle, sortedCountryGroups } = useTravelFiltering({
    city,
    country,
    data,
    item,
  });

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
    setEditingItem(null);
  }, []);

  const { deletePlace, updatePlace } = useTravelMutations({
    onDeleteError: (error: Error) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      setErrorMessage(`Failed to delete place: ${errorMessage}`);
    },
    onDeleteSuccess: () => {
      setMessage('Place deleted successfully');
      handleCloseDialog();
    },
    onUpdateError: (error: Error) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      setErrorMessage(`Failed to update place: ${errorMessage}`);
    },
    onUpdateSuccess: () => {
      setMessage('Place updated successfully');
      handleCloseDialog();
    },
  });

  const handleSaveItem = useCallback(
    (updatedItem: Place) => {
      updatePlace(updatedItem);
    },
    [updatePlace],
  );

  const handleDeleteItem = useCallback(
    (itemId: number) => {
      deletePlace(itemId);
    },
    [deletePlace],
  );

  const handleAddNew = useCallback(() => {
    setEditingItem(null);
    setIsDialogOpen(true);
  }, []);

  const handleEditItem = useCallback((item: Place) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  }, []);

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
          <StickyMenuWrapper variant="plain">
            <TravelMenu />
          </StickyMenuWrapper>
        </Layout.Menu>
        <Layout.Content>
          <Layout.Article>
            <PageTitle title={pageTitle}>
              <IconButton
                aria-label="Add new place"
                onClick={handleAddNew}
              >
                <AddIcon />
              </IconButton>
            </PageTitle>
            <Layout.Section>
              {isLoading ? (
                <Skeleton />
              ) : isError && error != null ? (
                <div>Error loading travel destinations</div>
              ) : sortedCountryGroups == null ? (
                <Items
                  data={filteredData}
                  onEdit={handleEditItem}
                />
              ) : (
                <>
                  {sortedCountryGroups.map(
                    ({ countryName, data: groupData }) => (
                      <CountryGroup key={countryName}>
                        <CountryHeading>{countryName}</CountryHeading>
                        <Items
                          data={groupData}
                          onEdit={handleEditItem}
                        />
                      </CountryGroup>
                    ),
                  )}
                </>
              )}
            </Layout.Section>
          </Layout.Article>
        </Layout.Content>
      </Layout.TwoColumn>
      <TravelItemEditDialog
        isOpen={isDialogOpen}
        item={editingItem}
        key={editingItem?.id ?? 'new'}
        onClose={handleCloseDialog}
        onDelete={handleDeleteItem}
        onSave={handleSaveItem}
      />
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
