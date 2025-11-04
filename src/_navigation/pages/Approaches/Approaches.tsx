import clsx from "clsx";
import React from "react";

import { useParams } from "react-router";

const Approaches = () => {
  const { exercise: exerciseName } = useParams();

  return (
    <div className="bg-gray-100 h-dvh w-full flex flex-col">
      <div
        className={clsx(
          "shrink-0 backdrop-blur-sm border-b border-gray-200 px-2 py-4 z-10 shadow-sm"
        )}
      >
        <div className="flex items-center mb-2">{exerciseName}</div>
      </div>
    </div>
  );
};

export default Approaches;
