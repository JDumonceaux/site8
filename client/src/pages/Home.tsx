import "./home.css";

import { useEffect } from "react";
import { APP_NAME } from "../utils";
import TwoColumn from "../pages/Layouts/TwoColumn/TwoColumn";
import PageTitle from "../components/common/PageTitle/PageTitle";
import { PantoneColor } from "../components/ui/RightColumn/PantoneColor";
import Ball from "../components/ui/Animation/Ball";
import Floor from "../components/ui/Animation/Floor";

function Home() {
  useEffect(() => {
    document.title = `${APP_NAME} - Home`;
  }, []);

  return (
    <div className="home">
      <TwoColumn
        pageTitle={<PageTitle title={APP_NAME} />}
        left={
          <main className="main">
            <p>
              It is a proven fact that there are 525,600 developers working
              every minute of every hour of every day to make programming
              easier. They're busy breaking code, adding bugs, making things
              more complicated - all in the pursuit of job security. Therefore,
              your knowledge of programming will never be complete: there's
              always something to learn, explore, or revisit.
            </p>
            <p className="italic">
              "The journey is never ending. There's always gonna be growth,
              improvement, adversity; you just gotta take it all in and do
              what's right, continue to grow, continue to live in the moment."
              -- Antonio Brown
            </p>
            <Ball />
            <Floor />
          </main>
        }
        right={
          <div className="right-column">
            <img src="./face.png" alt="" />
            <PantoneColor />
          </div>
        }
      />
    </div>
  );
}

export default Home;
