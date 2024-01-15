import { useEffect } from "react";

import { APP_NAME } from "../../utils/constants";

import PageTitle from "../../components/common/PageTitle/PageTitle";
import TwoColumn from "../Layouts/TwoColumn/TwoColumn";

import "./musicList.css";

import LoadingWrapper from "../../components/common/LoadingWrapper";
import useResources from "../../services/hooks/useResources";

export default function ResourcesList() {
  const { data, loading, error, fetchData } = useResources();

  useEffect(() => {
    document.title = `${APP_NAME} - Resources`;
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log("data", data);

  return (
    <TwoColumn
      pageTitle={<PageTitle title="Resources" />}
      left={
        <section className="section">
          <p>These are some of my favorite xs.</p>
          <LoadingWrapper isLoading={loading} error={error}>
            Loadinggg
          </LoadingWrapper>
        </section>
      }
      right={<div className="right-column"></div>}
    />
  );
}
