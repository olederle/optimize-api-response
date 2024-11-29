import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import { exists } from "fs-extra";
import { join } from "path";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";
import { ReadableStream } from "node:stream/web";

const DOWNLOAD_URL =
  "https://api.openstreetmap.org/api/0.6/map?bbox=11.54,48.14,11.543,48.145";

// The download path to store the images.
const DOWNLOAD_PATH = join(__dirname, "..", "..", "data");

/**
 * A function that downloads a file.
 *
 * @param downlaodUrl The URL to download
 * @param downloadPath The path to save the downloaded file.
 */
async function downloadImages(
  downlaodUrl: string,
  downloadPath: string
): Promise<void> {
  // to be sure the download directory exists
  const doesDownloadPathExist = await exists(downloadPath);
  if (doesDownloadPathExist === false) {
    console.log(`Creating directory: ${downloadPath}`);
    await mkdir(downloadPath, { recursive: true });
  }

  const downloadFilePath = `${downloadPath}/map.osm`;
  const downloadFilePathExist = await exists(downloadFilePath);

  // do not download, if it exists already
  if (downloadFilePathExist === false) {
    console.log(`Downloading: ${downlaodUrl}`);
    const response = await fetch(downlaodUrl);
    if (response.ok && response.body) {
      const fileStream = createWriteStream(downloadFilePath, { flags: "wx" });
      await finished(
        Readable.fromWeb(response.body as ReadableStream<Uint8Array>).pipe(
          fileStream
        )
      );
    }
  }
}

downloadImages(DOWNLOAD_URL, DOWNLOAD_PATH);
