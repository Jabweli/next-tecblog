"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ImageKit from "@/components/Image";
import Upload from "@/components/Upload";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css"; // ES6

export default function Write() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [cover, setCover] = useState<any>({});
  const [img, setImg] = useState<any>({});
  const [video, setVideo] = useState<any>({});
  const { getToken } = useAuth();

  // // State to keep track of the current upload progress (percentage)
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (img?.url) {
      setValue((prev) => prev + `<p><img src="${img.url}"/></p>`);
    }
  }, [img]);

  useEffect(() => {
    if (video?.url) {
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
      );
    }
  }, [video]);

  const mutation = useMutation({
    mutationFn: async (newPost: any) => {
      const token = await getToken();
      return axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/posts`,
        newPost,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (res) => {
      toast.success("Post created successfully!");
      setValue("");
      setCover({});
      setImg({});
      setVideo({});
      setProgress(0);
      router.push(`/post/${res.data.slug}`);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement; // ✅ type assertion
    const formData = new FormData(form);

    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const desc = formData.get("desc") as string;

    if (!title || !category || !desc || !value || !cover) {
      toast.error("All the fields are required!", { position: "top-center" });
      return;
    }

    const data = {
      title,
      category,
      desc,
      content: value,
      img: cover.filePath,
    };

    mutation.mutate(data, {
      onSuccess: () => {
        form.reset(); // clears form fields
      },
    });
  };

  return (
    <div className="h-[calc(100vh - 64px)] md:h-[calc(100vh - 80px)] flex flex-col gap-6">
      <h1 className="text-xl font-medium">Create a New Post</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <div className="flex gap-8 items-center">
          <div>
            <Upload type="image" setData={setCover} setProgress={setProgress}>
              <button
                type="button"
                className="w-max p-2 rounded-xl shadow-md text-sm text-gray-500 bg-white cursor-pointer"
              >
                Upload a cover image
              </button>
            </Upload>

            <span className="text-sm">
              Upload progress:{" "}
              <span className="text-green-600">{Math.floor(progress)}%</span>
            </span>
          </div>
          <div>
            {cover.filePath && (
              <ImageKit
                src={cover.filePath}
                width={150}
                height={60}
                alt=""
                className="object-cover rounded-xl"
              />
            )}
          </div>
        </div>
        <input
          type="text"
          name="title"
          placeholder="My Awesome Story"
          className="text-3xl font-semibold bg-transparent outline-none"
        />

        <div className="flex items-center gap-4">
          <label htmlFor="cat" className="text-sm">
            Choose a category:
          </label>
          <select
            id="cat"
            name="category"
            className="p-2 bg-white rounded-xl shadow-md outline-0 text-sm"
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="seo">Search Engines</option>
            <option value="databases">Databases</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          name="desc"
          placeholder="A short description"
          className="bg-white border border-gray-100 p-4 rounded-xl outline-0 shadow-md"
        ></textarea>
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            <Upload type="image" setData={setImg} setProgress={setProgress}>
              <div className="text-[25px]">🖼️</div>
            </Upload>

            <Upload type="video" setData={setVideo} setProgress={setProgress}>
              <div className="text-[30px]">📸</div>
            </Upload>
          </div>
          <ReactQuill
            theme="snow"
            className="flex-1 bg-white shadow-md rounded-xl"
            value={value}
            onChange={setValue}
            // readOnly={0 < progress && progress < 100}
          />
        </div>
        <button
          type="submit"
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          className="bg-blue-800 text-white py-3 px-8 w-max rounded-xl cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Loading..." : "Send"}
        </button>
        {mutation.isError && (
          <span className="text-xs text-red-600 mt-3">
            {mutation.error.message}
          </span>
        )}
      </form>
    </div>
  );
}
