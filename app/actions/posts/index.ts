"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api`;

export async function listPosts(formData: FormData) {
  const limit = formData.get("limit") as string;
  const tags = formData.get("tags") as string;

  let url = new URL(`${API_URL}/posts`);

  if (limit) url.searchParams.set("limit", limit);
  if (tags) url.searchParams.set("tags", tags);

  const response = await fetch(url, {
    method: "GET",
  });

  const { data } = await response.json();

  return data;
}

export async function createPost() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user) {
    console.error("Auth error:", error);
  }

  const response = await fetch(`${API_URL}/posts/`, {
    method: "POST",
    body: JSON.stringify({ userId: user?.id }),
  });

  revalidatePath("/");

  return await response.json();
}

export async function getPost(slug: string) {
  const response = await fetch(`${API_URL}/posts/${slug}`, {
    method: "GET",
  });

  const data = await response.json();

  return data;
}

export async function deletePost(id: string) {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    redirect("/");
  }
  return await response.json();
}
