import axios from 'axios';
import { ServiceUrl } from '../lib/utils/constants';
import { Music } from 'types/Music';

// Use:  const data = useLoaderData() as IMusic;

export const musicLoader = async () => {
  const res = await axios.get<Music>(ServiceUrl.ENDPOINT_MUSIC);
  return res.data;
};
