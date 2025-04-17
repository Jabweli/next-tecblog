import React from "react";
import UpdatePost from "@/components/UpdatePost";

export default async function UpdatePostPage({ params }: SearchParamProps) {
  const slug = ((await params)?.slug as string) || "";

  return <UpdatePost slug={slug} />;
}
