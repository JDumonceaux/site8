import { useEffect } from "react";
import { APP_NAME } from "../../utils/constants";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import TwoColumn from "../Layouts/TwoColumn/TwoColumn";
import LoadingWrapper from "../../components/common/LoadingWrapper";
import usePhotos from "../../services/hooks/usePhotos";
import "./photoList.css";

function PhotoList() {
  const { data, loading, error, fetchData } = usePhotos();

  useEffect(() => {
    document.title = `${APP_NAME} - Photos`;
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="photo-list">
      <TwoColumn
        pageTitle={<PageTitle title="My Photos" />}
        left={
          <main className="main">
            <LoadingWrapper isLoading={loading} error={error}>
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
            </LoadingWrapper>
          </main>
        }
        right={<div className="right-column"></div>}
      />
    </div>
  );
}

export default PhotoList;
