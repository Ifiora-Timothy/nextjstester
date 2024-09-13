"use client";
import { FfmpegContext } from "@/providers/FfmpegContext";
import { use } from "react";

const useLoad = () => {
  const { isLoading, progressRef, ffmpeg } = use(FfmpegContext);
  return { isLoading, progressRef, ffmpeg };
};

export default useLoad;
