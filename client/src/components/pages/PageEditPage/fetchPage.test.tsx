import { useFetch } from 'hooks/Axios/useFetch';
import { ServiceUrl } from 'lib/utils/constants';
import { Page } from 'types';
import { describe, expect, test } from 'vitest';

describe('fetchPage', () => {
  const { data, fetchData } = useFetch<Page>();

  test('has React 17', () => {
    return fetchData(`${ServiceUrl.ENDPOINT_PAGE}/100`).then((data) => {
      expect(data).toContain('React 17');
    });
  });
});
