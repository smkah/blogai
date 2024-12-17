import { deletePost, getPost } from "@/app/actions/posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
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
  const { data: post } = await getPost(slug);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const handleDelete = deletePost.bind(null, post.id);

  return (
    <article className="container max-w-4xl py-10 space-y-8">
      <div className="relative flex items-center gap-2">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          ← Back to posts
        </Link>
        <form className="absolute top-0 right-0" action={handleDelete}>
          {user?.id && (
            // user?.id === post.author_id &&
            <Button variant="destructive" type="submit" size="sm">
              Delete
            </Button>
          )}
        </form>
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>

        <div className="flex items-center gap-4">
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
              <span className="text-sm text-muted-foreground">
                {formatDate(post.created_at.toString())}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {post.coverImage ? (
        <img
          src={post.coverImage}
          alt={post.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse"></div>
      )}
      {/* {post.coverImage && (
        <div
          dangerouslySetInnerHTML={{
            __html: post.coverImage,
          }}
        />
      )} */}

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
