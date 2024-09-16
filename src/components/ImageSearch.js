// ImageUploader.js
import { useState } from 'react';

const useImageUploader = () => {
  const [prediction, setPrediction] = useState("");

  const uploadImage = async (file) => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
      const response = await fetch(
        "https://api-inference.huggingface.co/models/nateraw/food",
        {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: file,
        }
      );
      const result = await response.json();    
    setPrediction(result[0].label.replace(/_/g, " "));
  };

  return { prediction, uploadImage };
};

export default useImageUploader;
