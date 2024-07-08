import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from 'store/imageSlice';
import { AppDispatch, RootState } from 'store/store';
import { Images } from 'types/Images';

const useUnmatchedImages = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selector = (state: RootState) => state.image;
  const data: Images | null = useSelector(selector).data;
  const isLoading = useSelector(selector).isLoading;
  const error = useSelector(selector).error;

  const dispatchFetchUnmatchedImages = useCallback(
    () => dispatch(fetchImages()),
    [dispatch],
  );

  return {
    data,
    isLoading,
    error,
    fetchData: dispatchFetchUnmatchedImages,
  };
};

export default useUnmatchedImages;
