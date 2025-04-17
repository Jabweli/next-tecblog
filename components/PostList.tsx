"use client";
import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import NoPostFound from "./NoPostFound";

const fetchPosts = async (pageParam: number, searchParams: any) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts`, {
    params: { page: pageParam, limit: 5, ...searchParams },
  });
  return res.data;
};

const PostList = () => {
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat") || "";
  const sort = searchParams.get("sort") || "";
  const author = searchParams.get("author") || "";
  const search = searchParams.get("search") || "";
  const featured = searchParams.get("featured") || "";

  const allParams = {
    ...(cat && { cat }),
    ...(sort && { sort }),
    ...(author && { author }),
    ...(search && { search }),
    ...(featured && { featured }),
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["posts", allParams],
      queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, allParams),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasMore ? pages.length + 1 : undefined,
    });

  // if (isFetching) {
  //   return <div className="flex-1">Loading...</div>;
  // }

  if (error) return "Something went wrong";

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  if(allPosts.length === 0){
    return <NoPostFound />
  }

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more posts....</h4>}
      endMessage={
        <p>
          <b>
            
          </b>
        </p>
      }
      className="flex flex-col gap-12 mb-8"
    >
      {allPosts.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default PostList;
