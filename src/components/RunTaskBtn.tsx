"use client";

import { Button } from "./ui/button";

type Props = {
  task: Array<string>;
  disabled: boolean;
  text: string;
};

const RunTaskBtn = ({ task, disabled, text }: Props) => {
  const handleMerge = () => {
    // Here you would implement the logic to merge images into a video
  };
  return (
    <Button onClick={handleMerge} disabled={disabled}>
      {text}
    </Button>
  );
};

export default RunTaskBtn;
