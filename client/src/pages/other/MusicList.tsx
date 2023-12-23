import axios from "axios";
import { useEffect, useState } from "react";
import { IMusic } from "../../services/api/music/models/IMusic";

export default function MusicList() {
  const [data, setData] = useState<IMusic>();

  const fetchData = async () => {
    try {
      await axios
        .get<IMusic>("http://localhost:3005/api/music")
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

  console.log("data", data);

  return (
    <div>
      {data?.items?.map((item) => {
        return (
          <div key={item.id}>
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
  );
}
