import { useState } from "react";

import AboutTab from "./AboutTab";
import ContactTab from "./ContactTab";
import PostsTab from "./PostsTab";
import TabButton from "./TabButton";

type Tab = "about" | "posts" | "contact";

const Demo = () => {
  const [tab, setTab] = useState<Tab>("about");

  const selectTab = (tab: Tab) => {
    setTab(tab);
  };

  return (
    <div className="tutorial">
      <div className="mb-4 flex flex-row items-center gap-4">
        <TabButton onClick={() => selectTab("about")} />
        <TabButton onClick={() => selectTab("posts")} />
        <TabButton onClick={() => selectTab("contact")} />
      </div>

      {tab === "about" && <AboutTab />}
      {tab === "posts" && <PostsTab />}
      {tab === "contact" && <ContactTab />}
    </div>
  );
};

export default Demo;
