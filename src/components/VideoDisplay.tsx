// display the video

import React from "react";

type Props = {};

const VideoDisplay = (props: Props) => {
  return (
    <div>
      <video
        controls
        autoPlay
        loop
        muted
        className="w-full h-auto"
        ref={(video) => {
          if (video) {
            video.src = URL.createObjectURL(
              new Blob([new Uint8Array(0)], { type: "video/mp4" })
            );
          }
        }}
      ></video>
    </div>
  );
};

export default VideoDisplay;
