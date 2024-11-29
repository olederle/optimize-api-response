import { IncomingMessage, ServerResponse } from "http";
import zlib from "zlib";

interface CompressionOptions {
  threshold?: number;
  level?: {
    brotli?: number;
    gzip?: number;
  };
  brotli?: boolean;
  gzip?: boolean;
  mimes?: RegExp;
}

declare function compression(
  options?: CompressionOptions
): (
  req: Pick<IncomingMessage, "method" | "headers">,
  res: ServerResponse,
  next?: (...args: any[]) => void
) => void;

interface CompressOptions {
  params?: {
    [key: string]: number | boolean;
  };
}

type CompressionType = "br" | "gzip";

interface Compressor {
  write(chunk: Buffer, encoding: string): boolean;
  end(): void;
}

export declare module "http-compression" {
  export default compression;
}
