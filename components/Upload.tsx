"use client";
import { authenticator } from "@/util/authenticator";
import React, { useRef } from "react";
import { upload } from "@imagekit/next";
import { toast } from "react-toastify";

const Upload = ({
  children,
  type,
  setData,
  setProgress,
}: {
  children: React.ReactNode;
  type: "image" | "video";
  setData: (value: any) => void;
  setProgress: (value: number) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      toast.error("Please select a file to upload", {
        position: "top-center",
        pauseOnHover: true,
      });
      return;
    }

    // Extract the first file from the file input
    const file = fileInput.files[0];

    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name, // Optionally set a custom file name
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
      });
      setData(uploadResponse);
    } catch (error) {
      toast.error("Upload failed!", { position: "top-center" });
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        accept={`${type}/*`}
        className="hidden"
        onChange={handleUpload}
      />
      <div
        className="cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {children}
      </div>
    </div>
  );
};

export default Upload;
