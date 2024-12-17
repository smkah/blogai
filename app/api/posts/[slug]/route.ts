import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const supabase = await createClient();
  const slug = (await params).slug;

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    return Response.json({ error: error.message });
  }

  return Response.json({ data });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const supabase = await createClient();
  const id = (await params).slug;

  const { data, error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    return Response.json({ error: error.message });
  }

  return Response.json({ data });
}
