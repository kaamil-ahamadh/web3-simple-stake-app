import React from "react";
import { Grid } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[95vh]">
      <Grid color="#00BFFF" height={80} width={80} />
      <div className="text-[#00BFFF] mt-6 font-poppins font-bold text-2xl">
        Simple Stake App
      </div>
    </div>
  );
};

export default Loading;
