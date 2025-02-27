import { listPosts } from "./actions/posts";
import { PostCard } from "@/components/ui/custom/post/post-card";
import { subject } from "@/constants";
import { LoadMore } from "@/components/load-more";
import { Params } from "next/dist/server/request/params";
import { SearchParams } from "next/dist/server/request/search-params";
import { BadgeFilter } from "@/components/ui/custom/badge-filter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Tags } from "lucide-react";

export default async function Index(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const limit = searchParams.limit || "5";
  const tags = searchParams.tags;

  const formData = new FormData();
  if (limit) formData.set("limit", limit.toString());
  if (tags) formData.set("tags", tags.toString());

  const posts = await listPosts(formData);

  // const [posts, setPosts] = useState<any>([]);
  // const [page, setPage] = useState(1);
  // const [isLoading, setIsLoading] = useState(false);
  // const [hasMore, setHasMore] = useState(true);

  // const next = async () => {
  //   setIsLoading(true);

  //   setTimeout(async () => {
  //     const posts = await listPosts(page);
  //     if (posts.length > 0) {
  //       setPosts((prev: any) => [...prev, ...posts]);
  //       setPage((prev) => prev + 1);
  //       setIsLoading(false);
  //     } else {
  //       setHasMore(false);
  //     }
  //   }, 100);
  // };

  const tagsArray = posts
    .map((p: any) => p.tags)
    .flat()
    .reduce((unique: string[], tag: string) => {
      return unique.includes(tag) ? unique : [...unique, tag];
    }, [])
    .map((tag: string) =>
      tag
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/-/g, " ")
    )
    .reduce((acc: { [key: string]: number }, tag: string) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

  return (
    <main className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-9 flex flex-col gap-4 px-4 items-center">
        <h1 className="font-medium text-2xl">
          Blog Ai - Seu blog de notícias gerado por IA
        </h1>
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
          <LoadMore />
        </div>

        <p className="text-sm text-muted-foreground text-center max-w-2xl mt-4 bg-muted p-2 rounded-md">
          Aviso: Todos os posts e imagens são gerados usando o modelo de IA. O
          conteúdo pode conter imprecisões ou erros. Use as informações com
          discernimento.
        </p>
      </div>
      <div className="lg:col-span-3 hidden lg:block">
        <div className="fixed w-96 space-y-4">
          <h3 className="font-medium text-xl">Principais tags</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(tagsArray as Record<string, number>)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 20)
              .map(([tag, count]) => (
                <BadgeFilter tag={tag} key={tag} count={count} />
              ))}
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <div className="fixed bottom-6 right-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size={"sm"}>
                <Tags />
                Tags filter
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="space-y-2">
              <AlertDialogHeader>
                <AlertDialogTitle>Select a tag</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="flex flex-wrap gap-3">
                {Object.entries(tagsArray as Record<string, number>)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 20)
                  .map(([tag, count]) => (
                    <BadgeFilter tag={tag} key={tag} count={count} />
                  ))}
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </main>
  );
}
