import React, { memo, useCallback, useEffect, useState } from "react";
import { ImagePreview } from "./ImagePreview";
import "./ImagePreviewGrid.css";

function useOnZoom(): {
  onReset: () => void;
  onZoom: (image: string | undefined) => void;
  zoomedImage: string | undefined;
} {
  const [zoomedImage, setZoomedImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    function reset() {
      setZoomedImage(undefined);
    }
    if (zoomedImage) {
      window.addEventListener("scroll", reset);
      return () => {
        window.removeEventListener("scroll", reset);
      };
    }
  }, [zoomedImage, setZoomedImage]);

  const onReset = useCallback(() => {
    setZoomedImage(undefined);
  }, [setZoomedImage]);
  return { onReset, onZoom: setZoomedImage, zoomedImage };
}

const ImagePreviewGridContent: React.FC<{
  images: Array<string>;
  onZoom: (image: string | undefined) => void;
}> = memo(({ images, onZoom }) => {
  return (
    <div className="image-preview-grid">
      {images &&
        images.map((image) => (
          <ImagePreview image={image} onZoom={onZoom} key={image} />
        ))}
    </div>
  );
});

export const ImagePreviewGrid: React.FC<{ images: Array<string> }> = ({
  images,
}) => {
  const { onReset, onZoom, zoomedImage } = useOnZoom();
  return (
    <>
      <ImagePreviewGridContent images={images} onZoom={onZoom} />
      {zoomedImage && (
        <div className="image-preview-grid-overlay" onClick={onReset}>
          <div className="image-preview-grid-mask" />
          <div className="image-preview-grid-overlay-container">
            <img src={`/api/${zoomedImage}`} />
          </div>
        </div>
      )}
    </>
  );
};
