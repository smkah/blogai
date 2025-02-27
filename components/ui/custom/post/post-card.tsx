import { formatDate } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../button";
import { Trash } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { deletePost } from "@/app/actions/posts";

interface PostCardProps {
  post: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    created_at: Date;
    author: {
      name: string;
      image?: string;
    };
    tags?: string[];
  };
}

export async function PostCard({ post }: PostCardProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Link href={`/b/${post.slug}`}>
      <Card className="overflow-hidden group hover:shadow-lg transition-all w-full max-w-[768px] mx-auto">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            width={1024}
            height={200}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 animate-pulse"></div>
        )}

        <CardHeader className="space-y-2 p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              {post.author?.image ? (
                <AvatarImage src={post.author.image} alt={post.author.name} />
              ) : (
                <AvatarFallback>
                  {post.author?.name ? (
                    post.author?.name?.slice(0, 2).toUpperCase()
                  ) : (
                    <span className="text-sm text-muted-foreground">BI</span>
                  )}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-medium">
                {post.author?.name}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground">
                {formatDate(post.created_at.toString())}
              </span>
            </div>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </CardHeader>

        <CardContent>
          <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>
        </CardContent>

        {post.tags && post.tags.length > 0 && (
          <CardFooter className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs sm:text-sm"
              >
                {tag}
              </Badge>
            ))}
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
