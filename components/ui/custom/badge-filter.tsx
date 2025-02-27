"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";

export function BadgeFilter({
  tag,
  count,
  ...props
}: { tag: string; count: number } & React.HTMLAttributes<HTMLDivElement>) {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const url = searchParams.size > 0 ? `&tags=${tag}` : `?tags=${tag}`;

  return (
    <Badge
      className="relative w-fit text-xs flex items-center cursor-pointer"
      onClick={() => push(url)}
      {...props}
    >
      {tag}
      <span className="absolute -top-2 -right-2 border border-muted-foreground text-muted-foreground w-4 h-4 rounded-full bg-white flex items-center justify-center text-xs font-bold shadow-sm">
        {count}
      </span>
    </Badge>
  );
}
