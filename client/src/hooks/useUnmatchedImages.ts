import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from 'store/ImageSlice';
import { AppDispatch, RootState } from 'store/store';

const useUnmatchedImages = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.image,
  );
  const fetchUnmatchedImages = () => {
    dispatch(fetchImages());
  };

  return {
    data,
    isLoading,
    error,
    fetchData: fetchUnmatchedImages,
  };
};

export default useUnmatchedImages;
