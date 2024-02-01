import axios from 'axios';
import { useState, useEffect } from 'react';
import { ITestGrid } from '../../services/api/models/testgrid/ITestGrid';
import { ServiceUrl } from '../../utils/constants';
import './testGrid.css';
import PageTitle from '../../components/common/PageTitle/PageTitle';

function TestGrid() {
  const [data, setData] = useState<ITestGrid>();

  const fetchData = async () => {
    try {
      await axios
        .get<ITestGrid>(ServiceUrl.ENDPOINT_TESTGRID)
        .then((response) => {
          console.log(response.data);
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
    <div className='test-grid'>
      <PageTitle title='Test Grid' />
      <div className='layout'>
        <main className='main'>
          <section>
            <table className='table'>
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
            <div className='scroll'>
              <table className='table'>
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
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default TestGrid;
