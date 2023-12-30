import axios from "axios";
import { IMusic } from "../../services/api/models/music/IMusic";
import { ServiceUrl } from "../../utils/constants";

export const musicLoader = async () => {
  const res = await axios.get<IMusic>(ServiceUrl.ENDPOINT_MUSIC);
  return res.data;
};
