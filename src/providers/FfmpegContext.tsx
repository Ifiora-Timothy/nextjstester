"use client";
import { FFmpeg, FFmpegConfiguration } from "@diffusion-studio/ffmpeg-js";

import { PropsWithChildren, use, useEffect, useRef, useState } from "react";
import { createContext } from "react";

type FFmpegContextType = {
  ffmpeg: FFmpeg<FFmpegConfiguration>;
  progressRef: React.MutableRefObject<HTMLParagraphElement>;
  isLoading: boolean;
};

export const FfmpegContext = createContext<FFmpegContextType>(null!);

export const FfmpegProvider = ({ children }: PropsWithChildren) => {
  const ffmpegRef = useRef<FFmpeg<FFmpegConfiguration>>(null!);

  const progressRef = useRef<HTMLParagraphElement>(null!);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    console.log("effect called");

    const loadFFmpeg = async () => {
      console.log("loading ffmpeg");

      ffmpegRef.current = new FFmpeg({
        log: true,
        config: "gpl-extended",
      });
      setisLoading(true);

      //check if they exist in the cache and load them from there else download them
      ffmpegRef.current.whenReady(async () => {
        setisLoading(false);
      });
    };

    loadFFmpeg();
  }, []);

  return (
    <FfmpegContext.Provider
      value={{
        ffmpeg: ffmpegRef.current,
        progressRef,
        isLoading,
      }}
    >
      {children}
    </FfmpegContext.Provider>
  );
};
