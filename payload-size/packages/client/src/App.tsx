import { useEffect, useRef, useState } from "react";
import { ImagePreviewGrid } from "./components/ImagePreviewGrid";

type ImageResponse = {
  images: Array<string>;
};

function useImageList(): Array<string> {
  const [imageList, setImageList] = useState<Array<string>>([]);
  const isMountedRef = useRef(false);

  useEffect(() => {
    async function getImageList() {
      const response = await fetch("/api");
      const images = (await response.json()) as ImageResponse;
      if (isMountedRef.current) setImageList(images.images);
    }
    void getImageList();

    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, [isMountedRef]);

  return imageList;
}

function App() {
  const imageList = useImageList();
  return <ImagePreviewGrid images={imageList} />;
}

export default App;
