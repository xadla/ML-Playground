import React from "react";

import UploadDataset from "../components/dataset/upload";
import CanvasComponent from "../components/dataset/canvas";

const CreateDataset = () => {

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Create or Upload Dataset</h2>
      <UploadDataset />
      <CanvasComponent />
    </div>
  );
};

export default CreateDataset;
