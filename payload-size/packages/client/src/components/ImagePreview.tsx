import React, { useCallback } from "react";
import "./ImagePreview.css";

export const ImagePreview: React.FC<{
  image: string;
  onZoom: (image: string | undefined) => void;
}> = ({ image, onZoom }) => {
  const onClick = useCallback(() => {
    onZoom(image);
  }, [image]);
  return (
    <div className="image-preview" onClick={onClick}>
      <img src={`/api/small-cached/${image}`} />
    </div>
  );
};
