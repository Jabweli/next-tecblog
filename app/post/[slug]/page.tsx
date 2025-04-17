import SinglePost from "@/components/SinglePost";

export default async function PostDetails({ params }: SearchParamProps) {
  const slug = ((await params)?.slug as string) || "";

  return <SinglePost slug={slug} />;
}
