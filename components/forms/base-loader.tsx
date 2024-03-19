import React from "react";
export interface BaseLoaderProps {
  className?: any;
}
const BaseLoader: React.FC = (props: BaseLoaderProps) => {
  return (
    <div className={`flex items-center justify-center h-full ${props.className}`}>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400">
      </div>
    </div>
  );
};

export default BaseLoader;