import { ServiceUrl } from '@lib/utils/constants';
import type { Place } from '@site8/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Dynamic endpoint helpers for travel
const ENDPOINT_TRAVEL_UPDATE = (id: number): string =>
  `${ServiceUrl.ENDPOINT_TRAVEL}/${id}`;
const ENDPOINT_TRAVEL_DELETE = (id: number): string =>
  `${ServiceUrl.ENDPOINT_TRAVEL}/${id}`;

type UseTravelMutationsOptions = {
  onDeleteError?: (error: Error) => void;
  onDeleteSuccess?: () => void;
  onUpdateError?: (error: Error) => void;
  onUpdateSuccess?: () => void;
};

type UseTravelMutationsReturn = {
  deletePlace: (itemId: number) => void;
  updatePlace: (item: Place) => void;
};

/**
 * Custom hook for travel place mutations (update, delete).
 * Provides mutation functions with automatic cache invalidation.
 */
const useTravelMutations = ({
  onDeleteError,
  onDeleteSuccess,
  onUpdateError,
  onUpdateSuccess,
}: UseTravelMutationsOptions = {}): UseTravelMutationsReturn => {
  const queryClient = useQueryClient();

  const { mutate: updatePlace } = useMutation({
    mutationFn: async (item: Place) => {
      const response = await fetch(ENDPOINT_TRAVEL_UPDATE(item.id), {
        body: JSON.stringify({
          address: item.address,
          city: item.city,
          country: item.country,
          description: item.description,
          lat: item.lat,
          lon: item.lon,
          name: item.name,
          region: item.region,
          state: item.state,
          tags: item.tags,
          type: item.type,
          visited: item.visited,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to update place');
      }

      return response.json() as Promise<unknown>;
    },
    onError: (error: Error) => {
      if (onUpdateError) {
        onUpdateError(error);
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['travel'] });
      void queryClient.invalidateQueries({ queryKey: ['travel-menu'] });
      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    },
  });

  const { mutate: deletePlace } = useMutation({
    mutationFn: async (itemId: number) => {
      const response = await fetch(ENDPOINT_TRAVEL_DELETE(itemId), {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete place');
      }

      return response.json() as Promise<unknown>;
    },
    onError: (error: Error) => {
      if (onDeleteError) {
        onDeleteError(error);
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['travel'] });
      void queryClient.invalidateQueries({ queryKey: ['travel-menu'] });
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    },
  });

  return {
    deletePlace,
    updatePlace,
  };
};

export default useTravelMutations;
