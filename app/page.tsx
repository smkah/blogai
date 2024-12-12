"use client";

import { useEffect, useState } from "react";
import { create, list } from "./actions/posts";
import { PostCard } from "@/components/ui/custom/post-card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

export default function Index() {
  const [posts, setPosts] = useState<any>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const posts = await list();
      setPosts(posts);
    })();
    console.log(process.env.VERCEL_URL);
  }, []);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    })();
  }, []);

  return (
    <>
      <main className="flex-1 flex flex-col gap-4 px-4 items-center">
        <h2 className="font-medium text-2xl">Blog Ai</h2>
        <h2 className="font-medium text-md mb-4">
          Confira as noticias mais relevantes sobre o mundo da tecnologia e da
          inovação
        </h2>

        <div className="flex flex-col gap-2">
          {posts.length > 0 &&
            posts.map((post: any) => <PostCard key={post.id} post={post} />)}
        </div>

        {user && (
          <div className="flex flex-col gap-2">
            <form action={create as any}>
              <Button>Criar post by IA</Button>
            </form>
          </div>
        )}
      </main>
    </>
  );
}
