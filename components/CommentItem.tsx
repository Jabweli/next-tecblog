"use client";
import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";
import ImageKit from "./Image";
import { toast } from "react-toastify";
import { FaTrashCan } from "react-icons/fa6";

const CommentItem = ({ comment }: any) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const isAdmin = user?.publicMetadata?.role === "admin" || false;

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Comment deleted successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-col gap-3 relative">
        <div className="flex items-center gap-2">
          <ImageKit
            src={comment.user.img ? comment.user.img : "/user.png"}
            alt="author"
            width={60}
            height={60}
            className="rounded-full w-8 h-8 object-cover"
          />
          <h4 className="text-sm capitalize">{comment.user.username}</h4>
          <span className="text-gray-600 text-[13px]">
            {format(comment.createdAt)}
          </span>
        </div>
        <p className="text-sm text-gray-500">{comment.desc}</p>

        {user && (comment.user.username === user.username || isAdmin) && (
          <div
            className="flex items-center gap-2 py-2 text-xs cursor-pointer absolute right-4 -bottom-2"
            onClick={handleDelete}
          >
            <FaTrashCan size={10} className="text-red-500" />
            Delete comment
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
