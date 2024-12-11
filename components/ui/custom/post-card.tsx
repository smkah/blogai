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

interface PostCardProps {
  post: {
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

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/b/${post.slug}`}>
      <Card className="overflow-hidden group hover:border-primary/20 transition-colors">
        {post.coverImage && (
          <div className="relative w-full h-48">
            <p className="absolute right-0 -bottom-6 text text-xs p-2 italic">
              Art by Pollinations.ai
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: post.coverImage,
              }}
            />
            {/* <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            /> */}
          </div>
        )}

        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              {post.author?.image ? (
                <AvatarImage src={post.author.image} alt={post.author.name} />
              ) : (
                <AvatarFallback>
                  {post.author?.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{post.author?.name}</span>
              <span className="text-xs text-muted-foreground ">
                {formatDate(post.created_at.toString())}
              </span>
            </div>
          </div>
          <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
        </CardContent>

        {post.tags && post.tags.length > 0 && (
          <CardFooter className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
