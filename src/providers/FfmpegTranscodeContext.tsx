"use client";
import useLoad from "@/hooks/useLoad";

import { PropsWithChildren, useRef, useState } from "react";
import { createContext } from "react";

type FFmpegTranscodeContextType = {
  progressRef: React.MutableRefObject<HTMLParagraphElement>;
  isFetching: boolean;
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  transcode: (task: Array<string>, url: string) => Promise<void>;
};

export const FfmpegTranscodeContext = createContext<FFmpegTranscodeContextType>(
  null!
);

export const FfmpegTranscodeProvider = ({ children }: PropsWithChildren) => {
  const progressRef = useRef<HTMLParagraphElement>(null!);
  const videoRef = useRef<HTMLVideoElement>(null!);

  const [isFetching, setIsFetching] = useState(false);
  const { ffmpeg } = useLoad();

  // toBlobURL is used to bypass CORS issue, urls with the same
  // domain can be used directly.
  //convert the video to a blob
  const videoBlob = async (url: string) => {
    return await fetch(url).then((res) => res.blob());
  };

  const transcode = async (task: Array<string>, url: string) => {
    setIsFetching(true);
    ffmpeg.writeFile("input.mp4", await videoBlob(url));

    ffmpeg.onMessage((message) => {
      console.log(message);
      const lines = message.toString().trim().split("\n");

      const matchLine = (lines as string[]).find((line: string) =>
        line.includes("out_time_ms")
      );

      const match = matchLine?.match(/out_time_ms=(\d+)/);

      const totalSize = match ? parseInt(match[1], 10) : 0;
      console.log({ totalSize }, "currProgress");
    });
    await ffmpeg.exec(task);
    console.log("done transcoding");

    const data = ffmpeg.readFile("output.mp4");

    console.log(
      "Transcoding complete",
      URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
    );
    videoRef.current.src = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );

    console.log(
      "Transcoding complete",
      URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
    );

    //free memory
    ffmpeg.deleteFile("input.mp4");
    ffmpeg.deleteFile("output.mp4");

    setIsFetching(false);
  };

  return (
    <FfmpegTranscodeContext.Provider
      value={{
        progressRef,
        isFetching,
        videoRef,
        transcode,
      }}
    >
      {children}
    </FfmpegTranscodeContext.Provider>
  );
};
