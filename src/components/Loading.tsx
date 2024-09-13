"use client";

import useLoad from "@/hooks/useLoad";
import { Loader2 } from "lucide-react";

const Loading = () => {
  const { isLoading } = useLoad();

  if (isLoading) {
    return (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-b-md flex items-center space-x-2">
        <Loader2 className="animate-spin h-4 w-4" />
        <span className="text-sm font-medium">Loading...</span>
      </div>
    );
  }
  return null;
};

export default Loading;
