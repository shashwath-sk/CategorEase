import React from "react";

export const UploadButton = ({setShowUploadModal}) => {

  const handleUpload = () => {
    setShowUploadModal(true);
  };

  return (
    <button className="button__logout" onClick={handleUpload}>
      Labels
    </button>
  );
};
