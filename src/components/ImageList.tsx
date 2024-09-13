"use client";
import { useState } from "react";

type Props = {};

const ImageList = (props: Props) => {
  const [images, setImages] = useState<File[]>([]);
  return (
    images.length > 0 && (
      <div>
        <h2 className="text-lg font-semibold mb-2">Selected Images:</h2>
        <ul className="list-disc pl-5">
          {images.map((image, index) => (
            <li key={index}>{image.name}</li>
          ))}
        </ul>
      </div>
    )
  );
};

export default ImageList;
