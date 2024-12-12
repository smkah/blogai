"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function list() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts`,
    {
      method: "GET",
    }
  );

  const { data } = await response.json();

  return data;
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

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts/`,
    {
      method: "POST",
      body: JSON.stringify({ userId: user?.id }),
    }
  );

  revalidatePath("/");

  return await response.json();
}

export async function get(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts/${slug}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  return data;
}
