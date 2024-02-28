import axios from 'axios';
import { Music } from 'services/models/Music';
import { ServiceUrl } from 'utils/constants';

// Use:  const data = useLoaderData() as IMusic;

export const musicLoader = async () => {
  const res = await axios.get<Music>(ServiceUrl.ENDPOINT_MUSIC);
  return res.data;
};
