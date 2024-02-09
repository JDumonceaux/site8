import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPhotos } from 'services/api/models/photos/IPhotos';
import { ServiceUrl } from 'utils';

function PhotoList() {
  const [data, setData] = useState<IPhotos>();

  const fetchData = async () => {
    try {
      await axios.get<IPhotos>(ServiceUrl.ENDPOINT_PHOTOS).then((response) => {
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
    <div className="photo-list">
      <main className="main">
        <ul>
          {data?.items?.map((item) => {
            return (
              <li key={item.id}>
                <a href={item.url} data-fancybox data-caption={item.description}>
                  <img src={item.url} alt={item.description} loading="lazy" />
                </a>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default PhotoList;
