"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Images() {
  const [image, setImage] = useState<string | null>(null);

  const handleCreateImage = async () => {
    const response = await fetch("https://api.pollinations.ai/v1/imagine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "Revolução Computação Quântica",
        width: 1792,
        height: 1024,
        num_images: 1,
      }),
    });
    const data = await response.json();
    setImage(data.images[0]);
  };

  //   const handleCreateImage = async () => {
  //     const response = await fetch("https://api.aimlapi.com/images/generations", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIML_API_KEY}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         provider: "fal-ai",
  //         prompt: "Revolução Computação Quântica",
  //         model: "",
  //       }),
  //     });
  //     const data = await response.json();
  //     setImage(data.image);
  //   };

  return (
    <>
      <Button onClick={handleCreateImage}>Criar imagem</Button>
    </>
  );
}
