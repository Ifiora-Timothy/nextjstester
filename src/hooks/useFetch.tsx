"use client";
import { FfmpegTranscodeContext } from "@/providers/FfmpegTranscodeContext";
import { use } from "react";

const useFetch = () => {
  const { isFetching, progressRef, transcode, videoRef } = use(
    FfmpegTranscodeContext
  );
  return { isFetching, progressRef, transcode, videoRef };
};

export default useFetch;
