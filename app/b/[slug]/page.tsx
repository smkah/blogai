import { get } from "@/app/actions/posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface Post {
  title: string;
  content: string;
  coverImage?: string;
  created_at: Date;
  author?: {
    name: string;
    image?: string;
  };
  tags?: string[];
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { data: post } = await get(slug);

  return (
    <article className="container max-w-4xl py-10 space-y-8">
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          ← Back to posts
        </Link>
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              {post.author?.image ? (
                <AvatarImage src={post.author.image} alt={post.author.name} />
              ) : (
                <AvatarFallback>
                  {post.author?.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{post.author?.name}</span>
              <span className="text-sm text-muted-foreground">
                {formatDate(post.created_at.toString())}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {post.coverImage && (
        <div
          dangerouslySetInnerHTML={{
            __html: post.coverImage,
          }}
        />
      )}

      {/* Content */}
      <div
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {post.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}
