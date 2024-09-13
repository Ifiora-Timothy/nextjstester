"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";

type Props = {};

const ImageUpload = (props: Props) => {
  const [video, setVideo] = useState<File>(null!);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setVideo(event.target.files[0]);
    }
  };
  return (
    <Input
      id="image-upload"
      type="file"
      accept=".mp4, .webm, .ogg, .mov, .avi, .flv, .wmv"
      onChange={handleVideoUpload}
    />
  );
};

export default ImageUpload;
