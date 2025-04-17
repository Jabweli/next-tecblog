"use client";

import React from "react";
import CommentItem from "./CommentItem";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import Link from "next/link";

const fetchComments = async (postId: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${postId}`
  );
  return res.data;
};

const Comments = ({ postId }: { postId: string }) => {
  const { getToken } = useAuth();
  const { user } = useUser();

  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newComment: any) => {
      const token = await getToken();
      return axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${postId}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      return toast.error("Login to write comment!");
    }

    const form = e.target as HTMLFormElement; // ✅ type assertion
    const formData = new FormData(form);

    const comment = formData.get("comment") as string;

    if (!comment) {
      toast.error("Write a comment!", { position: "top-center" });
      return;
    }

    const data = {
      comment,
    };

    mutation.mutate(data, {
      onSuccess: () => {
        form.reset(); // clears form fields
      },
    });
  };

  return (
    <div className="mt-5 flex flex-col gap-6 md:9/12">
      <h1 className="font-semibold text-xl text-gray-500 underline">
        Comments
      </h1>
      {user ? <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-5 mb-4">
          <textarea
            name="comment"
            placeholder="Write a comment..."
            className="w-full p-4 text-sm rounded-xl outline-0 bg-white border border-gray-100"
          ></textarea>
          <button
            disabled={mutation.isPending}
            className="bg-blue-800 text-white px-4 py-3 font-medium rounded-xl cursor-pointer disabled:bg-blue-300"
          >
            {mutation.isPending ? "Sending.." : "Send"}
          </button>
        </div>
      </form>
      </>: <Link href="/sign-in" className="font-semibold underline cursor-pointer">Login to comment on this post!</Link>}

      {isPending ? (
        <span className="text-sm">Loading</span>
      ) : error ? (
        <span className="text-sm">Error loading comments</span>
      ) : data && data.length > 0 ? (
        data.map((comment: any) => (
          <CommentItem key={comment._id} comment={comment} />
        ))
      ) : (
        <span className="text-sm">No comments found!</span>
      )}
    </div>
  );
};

export default Comments;
