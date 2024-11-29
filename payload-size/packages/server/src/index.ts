import express, { Express, Request, Response } from "express";
import { createReadStream } from "fs";
import { readdir } from "fs/promises";
import { basename, join } from "path";

const ORIGINAL_PATH = join(__dirname, "..", "images", "originals");

const app: Express = express();

// get an object with the existing images
app.get("/", async (req: Request, res: Response) => {
  const files = await readdir(ORIGINAL_PATH);
  res.send({
    images: files.map((f) => basename(f)),
  });
});

// get a single image
app.get("/:image", (req: Request, res: Response) => {
  const fileName = req.params.image;
  const readStream = createReadStream(join(ORIGINAL_PATH, fileName));
  readStream.pipe(res);
});

app.listen(3000, () => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});
