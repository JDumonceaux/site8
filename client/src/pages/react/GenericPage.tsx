import PageTitle from "../../components/common/PageTitle/PageTitle";
import { APP_NAME, ServiceUrl } from "../../utils";
import TwoColumn from "../Layouts/TwoColumn/TwoColumn";

import "./genericPage.css";
import { useEffect, useState } from "react";
import { IPage } from "../../services/api/models/page/IPage";
import Loading from "../../components/common/Loading";
import axios from "axios";

interface IProps {
  id: number;
  pageTitle: string;
}

export default function GenericPage({ id, pageTitle }: IProps) {
  const [data, setData] = useState<IPage | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    document.title = `${APP_NAME} - ${pageTitle}`;
  }, [pageTitle]);

  useEffect(() => {
    setIsLoading(true);
    setError(undefined);
    // responseType: default Json.  Options: arraybuffer, document, blob, text, or stream
    axios
      .get<IPage>(`${ServiceUrl.ENDPOINT_PAGE}/${id}`, {
        responseType: "text",
      })
      .then(function (response) {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 404) {
          setError("Record not found");
        } else {
          setError("Unknown error");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div className="generic-page" data-testid="GenericPage.root">
      <TwoColumn
        pageTitle={<PageTitle title={pageTitle} />}
        left={
          <main className="main">
            {isLoading ? (
              <Loading />
            ) : error ? (
              <div>{error}</div>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: data ? data : "",
                }}
              />
            )}
          </main>
        }
        right={
          <div className="right-column">
            <img src="./face.png" alt="" />
          </div>
        }
      />
    </div>
  );
}
