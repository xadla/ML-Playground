import React from "react";

import UploadDataset from "../components/dataset/UploadDataset";
import DatasetCreator from "../components/dataset/DatasetCreator";

const CreateDataset = () => {

  return (
    <div className="p-4">
      <h2 className="font-bold mb-4 text-center text-4xl">Create or Upload Dataset</h2>
      <DatasetCreator />
      <UploadDataset />
    </div>
  );
};

export default CreateDataset;
