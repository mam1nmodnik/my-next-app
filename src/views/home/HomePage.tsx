"use client";
import AllPostContainer from "@/entities/post/container/AllPostContainer";
import CreatePostForm from "@/features/post/createPost/CreatePostForm";
import { PostCardActions } from "@/features/post/PostCardActions";
import FeedSwitcher from "@/widgets/switcher/FeedSwitcher";
import { useState } from "react";

export default function HomePage() {
  const [toggle, setToggle] = useState(true);
  return (
    <>
      <FeedSwitcher toggle={toggle} setToggle={setToggle} />
      <CreatePostForm />
      {toggle ? (
        <AllPostContainer
          renderActions={(post) => <PostCardActions post={post} />}
        />
      ) : null}
    </>
  );
}
