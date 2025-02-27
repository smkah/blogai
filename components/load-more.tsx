"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import { listPosts } from "@/app/actions/posts";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export function LoadMore() {
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const limit: any = searchParams.get("limit") || 10;

  const router = useRouter();

  useEffect(() => {
    const loadMore = async () => {
      if (isLoading) return;
      if (inView && limit) {
        const newLimit = parseInt(limit) + 10;
        const formData = new FormData();
        formData.set("limit", newLimit.toString());
        const posts = await listPosts(formData);
        setIsLoading(posts.length < newLimit);
        router.push(
          `?limit=${posts.length < newLimit ? posts.length : newLimit}`,
          { scroll: false }
        );
      }
    };
    loadMore();
  }, [inView]);

  return (
    <>
      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        {inView && !isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      </div>
    </>
  );
}
