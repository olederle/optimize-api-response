import express, { Express, Request, Response } from "express";
import { createReadStream } from "fs";
import { join } from "path";

const DOWNLOAD_FILE = join(__dirname, "..", "data", "map.osm");

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.setHeader("Cache-control", "no-store");
  res.setHeader("Pragma", "no-cache");
  const readStream = createReadStream(DOWNLOAD_FILE);
  readStream.pipe(res);
});

app.get("/brotli", (req: Request, res: Response) => {
  // TODO: use brotli compression
  res.setHeader("Cache-control", "no-store");
  res.setHeader("Pragma", "no-cache");
  const readStream = createReadStream(DOWNLOAD_FILE);
  readStream.pipe(res);
});

app.get("/gzip", (req: Request, res: Response) => {
  // TODO: use gzip compression
  res.setHeader("Cache-control", "no-store");
  res.setHeader("Pragma", "no-cache");
  const readStream = createReadStream(DOWNLOAD_FILE);
  readStream.pipe(res);
});

app.listen(3000, () => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});
