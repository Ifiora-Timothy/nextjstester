"use client";
import Loading from "@/components/Loading";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useLoad from "@/hooks/useLoad";
import useFetch from "@/hooks/useFetch";

export default function Component() {
  const [video, setVideo] = useState<File>(null!);
  const { isLoading } = useLoad();
  const { isFetching, transcode, videoRef } = useFetch();

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setVideo(event.target.files[0]);
    }
  };
  const handleMerge = () => {
    const task = [
      "-y",
      "-loglevel",
      "8",
      "-hide_banner",
      "-i",
      "input.mp4",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "output.mp4",
    ];
    transcode(task, URL.createObjectURL(video));
    // Here you would implement the logic to merge images into a video
  };
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full bg-background border-b">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Video compressor</h1>
          <Loading />
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto space-y-6">
          <div>
            <label
              htmlFor="image-upload"
              className="block text-sm font-medium mb-2"
            >
              Upload Video
            </label>
            <Input
              id="image-upload"
              type="file"
              accept=".mp4, .webm, .ogg, .mov, .avi, .flv, .wmv"
              onChange={handleVideoUpload}
            />
          </div>
          <div>
            {video && <video src={URL.createObjectURL(video)} controls></video>}
            {/* <ImageList /> */}
            <Button onClick={handleMerge} disabled={isLoading}>
              {isFetching ? "Compressing..." : "Compress video"}
            </Button>
            {/* outputfile  video element*/}
            <video
              ref={videoRef}
              controls
              src={videoRef.current?.src}
              autoPlay
              loop
              muted
              className="w-full h-auto mt-4"
            ></video>
          </div>
        </div>
      </main>
    </div>
  );
}
