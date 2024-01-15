import axios from "axios";
import { useState, useEffect } from "react";
import { IPhotos } from "../../services/api/models/photos/IPhotos";
import { APP_NAME, ServiceUrl } from "../../utils/constants";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import TwoColumn from "../Layouts/TwoColumn/TwoColumn";
import "./photoList.css";

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

  useEffect(() => {
    document.title = `${APP_NAME} - Photos`;
  }, []);

  return (
    <div className="photo-list">
      <TwoColumn
        pageTitle={<PageTitle title="My Photos" />}
        left={
          <main className="main">
            <ul>
              {data?.items?.map((item) => {
                return (
                  <li key={item.id}>
                    <a
                      href={item.url}
                      data-fancybox
                      data-caption={item.description}
                    >
                      <img
                        src={item.url}
                        alt={item.description}
                        loading="lazy"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </main>
        }
        right={<div className="right-column"></div>}
      />
    </div>
  );
}

export default PhotoList;
