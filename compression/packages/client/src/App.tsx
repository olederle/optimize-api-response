import { useCallback, useRef, useState } from "react";
import "./App.css";

type Compression = "none" | "brotli" | "gzip";

function useDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [compression, setCompression] = useState<Compression>("none");

  const downloadDurationRef = useRef<number>();

  const download = useCallback(() => {
    async function doDownload() {
      setIsDownloading(true);
      const start = Date.now();
      try {
        const response = await fetch(
          compression !== "none" ? `/api/${compression}` : "/api"
        );
        await response.blob();
        downloadDurationRef.current = Date.now() - start;
      } finally {
        setIsDownloading(false);
      }
    }
    void doDownload();
  }, [compression, setIsDownloading]);

  return {
    compression,
    download,
    duration: downloadDurationRef.current,
    isDownloading,
    updateCompression: setCompression,
  };
}

function App() {
  const { compression, download, duration, isDownloading, updateCompression } =
    useDownload();

  return (
    <>
      <h1>Download Performance</h1>
      <div className="card">
        <button disabled={isDownloading} onClick={() => download()}>
          Download
        </button>
        None
        <input
          type="radio"
          disabled={isDownloading}
          name="type"
          value="cursor"
          checked={compression === "none"}
          onChange={() => updateCompression("none")}
        />{" "}
        Brotli
        <input
          type="radio"
          disabled={isDownloading}
          name="type"
          value="offset"
          checked={compression === "brotli"}
          onChange={() => updateCompression("brotli")}
        />{" "}
        GZip
        <input
          type="radio"
          disabled={isDownloading}
          name="type"
          value="Page"
          checked={compression === "gzip"}
          onChange={() => updateCompression("gzip")}
        />{" "}
        <p>
          Duration <span>{duration}</span>ms
        </p>
      </div>
      {isDownloading && <span className="loader"></span>}
    </>
  );
}

export default App;
