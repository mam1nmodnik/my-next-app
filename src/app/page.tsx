"use client";

import { Divider } from "antd";

import { useState } from "react";
import PopularPost from "./entities/post/container/AllPostContainer";
import FeedSwitcher from "./widgets/FeedSwitcher/FeedSwitcher";
import CreatePostForm from "../components/features/сreatePost/CreatePostForm";

export default function Home() {

  const [toggle, setToggle] = useState(true);

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[568px] w-full border border-r-white/45 border-l-white/45 h-full min-h-screen">
        <FeedSwitcher toggle={toggle} setToggle={setToggle} />
        <Divider
          size="small"
          className="border border-white/35 m-0"
          style={{ margin: 0 }}
        />

        <CreatePostForm />

        <Divider
          size="small"
          className="border border-white/35"
          style={{ margin: 0 }}
        />

        {toggle ? <PopularPost /> : null}
      </div>
    </div>
  );
}
