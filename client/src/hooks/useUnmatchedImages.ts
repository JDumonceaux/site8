import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from 'store/ImageSlice';
import type { AppDispatch, RootState } from 'store/store';

const useUnmatchedImages = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, error, isLoading } = useSelector(
    (state: RootState) => state.image,
  );
  const fetchUnmatchedImages = () => {
    dispatch(fetchImages());
  };

  return {
    data,
    error,
    fetchData: fetchUnmatchedImages,
    isLoading,
  };
};

export default useUnmatchedImages;
