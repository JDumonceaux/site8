// import { useEffect, useState } from "react";
import { IMusic } from "../../services/api/models/music/IMusic";
import { APP_NAME } from "../../utils/constants";

import styles from "./musicList.module.css";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import TwoColumn from "../Layouts/TwoColumn/TwoColumn";

export default function MusicList() {
  // const [data, setData] = useState<IMusic>();
  const data = useLoaderData() as IMusic;

  useEffect(() => {
    document.title = `${APP_NAME} - Music`;
  }, []);

  return (
    <div className="music-list">
      <TwoColumn
        pageTitle={<PageTitle title="Music" />}
        left={
          <main className="main">
            <div>
              {data?.items?.map((item) => {
                return (
                  <div key={item.id} className={styles.column}>
                    <iframe
                      width="560"
                      height="315"
                      src={item.url}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                  </div>
                );
              })}
            </div>
          </main>
        }
        right={<div className="right-column"></div>}
      />
    </div>
  );
}
