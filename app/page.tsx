"use client";

import InfiniteScroll from "@/components/infinite-scroll";
import { listPosts } from "./actions/posts";
import { PostCard } from "@/components/ui/custom/post-card";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { PER_PAGE, subject } from "@/constants";
export default function Index() {
  const [posts, setPosts] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const next = async () => {
    setIsLoading(true);

    setTimeout(async () => {
      const posts = await listPosts(page);
      if (posts.length > 0) {
        setPosts((prev: any) => [...prev, ...posts]);
        setPage((prev) => prev + 1);
        setIsLoading(false);
      } else {
        setHasMore(false);
      }
    }, 100);
  };

  return (
    <>
      <main className="flex-1 flex flex-col gap-4 px-4 items-center">
        <h2 className="font-medium text-2xl">Blog Ai</h2>
        <p className="font-medium text-md mb-4">
          Confira as noticias mais relevantes sobre o mundo da{" "}
          <b className="text-primary">{subject}</b>
        </p>

        <h3 className="mt-4 text-xl font-medium">Últimas do blog</h3>

        <div className="flex flex-col gap-10 justify-center items-center">
          {posts.length > 0 &&
            posts.map((post: any, key: any) => (
              <PostCard key={key} post={post} />
            ))}
          <InfiniteScroll
            hasMore={hasMore}
            isLoading={isLoading}
            next={next}
            threshold={1}
          >
            {hasMore && <Loader2 className="my-4 h-8 w-8 animate-spin" />}
          </InfiniteScroll>
        </div>

        <p className="text-sm text-muted-foreground text-center max-w-2xl mt-4 bg-muted p-2 rounded-md">
          Aviso: Todos os posts e imagens são gerados usando o modelo de IA. O
          conteúdo pode conter imprecisões ou erros. Use as informações com
          discernimento.
        </p>
      </main>
    </>
  );
}
