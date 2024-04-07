import { PageTitle } from 'components/common/PageTitle';
import './testGrid.css';

import axios from 'axios';

import { useEffect, useState } from 'react';
import { TestItem } from 'services/types/TestItem';
import { ServiceUrl } from 'utils/constants';
import StyledMain from 'components/common/StyledMain';

const TestGridPage = (): JSX.Element => {
  const [data, setData] = useState<TestItem>();

  const fetchData = async () => {
    try {
      await axios
        .get<TestItem>(ServiceUrl.ENDPOINT_TESTGRID)
        .then((response) => {
          // eslint-disable-next-line promise/always-return
          setData(response?.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StyledMain>
      <PageTitle title="Test Grid" />
      <section>
        <table>
          <thead>
            <tr>
              <th>Area</th>
              <th>Subarea</th>
              <th>Value</th>
              <th>Result</th>
              <th>Comment</th>
              <th>Help</th>
            </tr>
          </thead>
        </table>
        <table>
          <tbody>
            {data?.items?.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.area}</td>
                  <td>{item.subarea}</td>
                  <td>{item.value}</td>
                  <td>{item.result}</td>
                  <td>{item.comment}</td>
                  <td>{item.help}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </StyledMain>
  );
};

export default TestGridPage;
