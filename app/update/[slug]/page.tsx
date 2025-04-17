import React from 'react'
import UpdatePost from "@/components/UpdatePost";

const UpdatePostPage = async ({ params }: SearchParamProps) => {
  const slug = ((await params)?.slug as string) || "";

  return <UpdatePost slug={slug} />;
};

export default UpdatePostPage;