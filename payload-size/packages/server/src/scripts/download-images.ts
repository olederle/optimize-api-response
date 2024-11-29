import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import { exists } from "fs-extra";
import { join } from "path";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";
import { ReadableStream } from "node:stream/web";

// All the images we are using.
const IMAGE_URLS = {
  "001": "https://picsum.photos/id/0/5000/3333",
  "007": "https://picsum.photos/id/7/4728/3168",
  "010": "https://picsum.photos/id/10/2500/1667",
  "011": "https://picsum.photos/id/11/2500/1667",
  "013": "https://picsum.photos/id/13/2500/1667",
  "017": "https://picsum.photos/id/17/2500/1667",
  "018": "https://picsum.photos/id/20/3670/2462",
  "023": "https://picsum.photos/id/23/3887/4899",
  "024": "https://picsum.photos/id/24/4855/1803",
  "028": "https://picsum.photos/id/28/4928/3264",
  "029": "https://picsum.photos/id/29/4000/2670",
  "035": "https://picsum.photos/id/35/2758/3622",
  "040": "https://picsum.photos/id/40/4106/2806",
  "041": "https://picsum.photos/id/41/1280/805",
  "042": "https://picsum.photos/id/42/3456/2304",
  "049": "https://picsum.photos/id/49/1280/792",
  "050": "https://picsum.photos/id/50/4608/3072",
  "056": "https://picsum.photos/id/56/2880/1920",
  "054": "https://picsum.photos/id/54/3264/2176",
  "057": "https://picsum.photos/id/57/2448/3264",
  "059": "https://picsum.photos/id/59/2464/1632",
  "062": "https://picsum.photos/id/62/2000/1333",
  "069": "https://picsum.photos/id/69/367/267",
  "077": "https://picsum.photos/id/77/1631/1102",
  "081": "https://picsum.photos/id/81/5000/3250",
  "084": "https://picsum.photos/id/84/1280/848",
  "089": "https://picsum.photos/id/89/4608/2592",
  "091": "https://picsum.photos/id/91/3504/2336",
  "092": "https://picsum.photos/id/92/3568/2368",
  "093": "https://picsum.photos/id/93/2000/1334",
  "098": "https://picsum.photos/id/98/3264/2176",
};

// The download path to store the images.
const DOWNLOAD_PATH = join(__dirname, "..", "..", "images", "originals");

/**
 * A function that downloads high-quality images.
 *
 * @param imageUrls An object with the images, where the key is the name of the image and the value is its URL.
 * @param downloadPath The path to save the downloaded images.
 */
async function downloadImages(
  imageUrls: Record<string, string>,
  downloadPath: string
): Promise<void> {
  // to be sure the download directory exists
  const doesDownloadPathExist = await exists(downloadPath);
  if (doesDownloadPathExist === false) {
    console.log(`Creating directory: ${downloadPath}`);
    await mkdir(downloadPath, { recursive: true });
  }

  // process every image
  const imageKeys = Object.keys(imageUrls);
  for (let i = 0; i < imageKeys.length; i++) {
    const imageKey = imageKeys[i];
    const imageUrl = imageUrls[imageKey];

    const downloadFilePath = `${downloadPath}/${imageKey}.jpg`;
    const downloadFilePathExist = await exists(downloadFilePath);

    // do not download, if it exists already
    if (downloadFilePathExist === false) {
      console.log(`Downloading: ${imageUrl}`);
      const response = await fetch(imageUrl);
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
}

downloadImages(IMAGE_URLS, DOWNLOAD_PATH);
