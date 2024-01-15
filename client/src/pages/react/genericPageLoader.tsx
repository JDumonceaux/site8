import axios from "axios";
import { IPage } from "../../services/api/models/page/IPage";
import { ServiceUrl } from "../../utils/constants";

export const genericPageLoader = (id: number) => async () => {
  const res = await axios.get<IPage>(`${ServiceUrl.ENDPOINT_PAGE}/${id}`);
  return res.data;
};
