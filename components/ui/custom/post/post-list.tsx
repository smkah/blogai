"use client";

import { useEffect, useState } from "react";
import { PostCard } from "./post-card";
import { listPosts } from "@/app/actions/posts";

export function PostList({ posts }: { posts: any }) {
  const [page, setPage] = useState(1);
  const [allposts, setAllPosts] = useState(posts);
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await listPosts(page);
      setAllPosts(posts);
      setPage(page + 1);
    };
    fetchPosts();
  }, [posts]);

  return (
    <div>
      {allposts.length > 0 &&
        allposts.map((post: any, key: any) => (
          <PostCard key={key} post={post} />
        ))}
    </div>
  );
}
