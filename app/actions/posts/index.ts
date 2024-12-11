"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function list() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function create() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user) {
    console.error("Auth error:", error);
  }

  const response = await fetch("http://localhost:3000/api/posts/", {
    method: "POST",
    body: JSON.stringify({ userId: user?.id }),
  });

  revalidatePath("/");

  return await response.json();
}

export async function get(slug: string) {
  const response = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    method: "GET",
  });

  const data = await response.json();

  return data;
}
