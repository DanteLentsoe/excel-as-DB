import React from "react";
import AnalyticsImage from "../../../assets/Analytics.svg";

export const AnalyticsView = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 bg-slate-800 rounded-lg mt-4">
      <div className="w-full max-w-4xl text-center flex flex-col items-center">
        <AnalyticsImage className="w-full h-auto max-w-md" />
        <div className="mt-4 p-4">
          <h1 className="text-xl font-bold">
            No Analytics Overview (No excel file data loaded)
          </h1>
        </div>
      </div>
    </div>
  );
};
