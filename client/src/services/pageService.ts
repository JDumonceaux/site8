import axios from 'axios';
import { IPage } from './api/models/pages/IPage';
import { ServiceUrl } from 'utils';

const baseUrl = 'http://localhost:3001/api';

const createRequestOptions = <T>(method: string, data: T) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

const createPage = async (page: IPage) => {
  const options = createRequestOptions('POST', page);
  return await axios.post(`${ServiceUrl.ENDPOINT_PAGE}`, options);
};

const updatePage = async (page: IPage) => {
  const options = createRequestOptions('PUT', page);
  return await axios.put(`${baseUrl}/pages`, options);
};

const deletePage = async (id: number) => {
  const options = createRequestOptions('DELETE', id);
  return await axios.delete(`${baseUrl}/pages`, options);
};
export default {
  createPage,
  updatePage,
  deletePage,
};
