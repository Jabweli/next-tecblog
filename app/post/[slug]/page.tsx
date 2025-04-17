import SinglePost from "@/components/SinglePost";

const PostDetails = async ({ params }: SearchParamProps) => {
  const slug = ((await params)?.slug as string) || "";

  return <SinglePost slug={slug} />;
};

export default PostDetails;
