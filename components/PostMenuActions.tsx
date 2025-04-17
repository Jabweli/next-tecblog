"use client";
import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Link from "next/link";

const PostMenuActions = ({ post }: any) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    isPending,
    error,
    data: savedPosts,
  } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken();
      return axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/saved-posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
  });

  const isAdmin = user?.publicMetadata?.role === "admin" || false;
  const isSaved = savedPosts?.data?.some((p: any) => p === post._id) || false;

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${post._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      router.push("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/save`,
        { postId: post._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const featureMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/feature`,
        { postId: post._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post.slug] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleSave = () => {
    if (!user) {
      return router.push("/");
    }
    saveMutation.mutate();
  };

  const handleFeature = () => {
    featureMutation.mutate();
  };

  return (
    <>
      {user && (
        <div>
          <h2>Actions</h2>
          {isPending ? (
            <span className="text-sm mt-2">Loading...</span>
          ) : error ? (
            <span className="text-sm mt-2">Fetching saved posts failed</span>
          ) : (
            <div
              className="flex items-center gap-2 py-2 text-sm cursor-pointer"
              onClick={handleSave}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="20px"
                height="20px"
              >
                <path
                  d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
                  stroke="black"
                  strokeWidth="2"
                  fill={isSaved ? "blue" : "none"}
                />
              </svg>
              <span>
                {saveMutation.isPending
                  ? "Saving post..."
                  : isSaved
                  ? "Post is saved!"
                  : "Save this post"}
              </span>
            </div>
          )}

          {isAdmin && (
            <div
              className="flex items-center gap-2 py-2 text-sm cursor-pointer"
              onClick={handleFeature}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="20px"
                height="20px"
              >
                <path
                  d="M24 2L29.39 16.26L44 18.18L33 29.24L35.82 44L24 37L12.18 44L15 29.24L4 18.18L18.61 16.26L24 2Z"
                  stroke="black"
                  strokeWidth="2"
                  fill={post.isFeatured ? "yellow" : "none"}
                />
              </svg>
              <span>
                {featureMutation.isPending
                  ? "Featuring post..."
                  : post.isFeatured
                  ? "Post is feaured!"
                  : "Feature this post"}
              </span>
            </div>
          )}

          {user && (post.user.username === user.username || isAdmin) && (
            <Link
              href={`/update/${post.slug}`}
              className="flex items-center gap-2 py-2 text-sm cursor-pointer"
            >
              <FaEdit size={19} className="text-green-500" />
              <span className="text-green-700">Edit this post</span>
            </Link>
          )}

          {user && (post.user.username === user.username || isAdmin) && (
            <div
              className="flex items-center gap-2 py-2 text-sm cursor-pointer"
              onClick={handleDelete}
            >
              <FaTrashCan size={19} className="text-red-500" />
              <span className="text-red-700">Delete this post</span>
              {deleteMutation.isPending && (
                <span className="text-xs">(in progress)</span>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PostMenuActions;
