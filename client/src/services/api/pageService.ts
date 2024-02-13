import axios from 'axios';
import { IPage } from './models/pages/IPage';

const baseUrl = 'http://localhost:3001/api';

function createRequestOptions<T>(method: string, data: T) {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}

async function createPage(page: IPage) {
  const options = createRequestOptions('POST', page);
  return await axios.post(`${baseUrl}/pages`, options);
}

async function updatePage(page: IPage) {
  const options = createRequestOptions('PUT', page);
  return await axios.put(`${baseUrl}/pages`, options);
}

async function deletePage(id: number) {
  const options = createRequestOptions('DELETE', id);
  return await axios.delete(`${baseUrl}/pages`, options);
}
export default {
  createPage,
  updatePage,
  deletePage,
};
