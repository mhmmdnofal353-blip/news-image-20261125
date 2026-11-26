// news-image-20261125 — entry program.
// The front page for Wednesday 25 November 2026 was composed in advance
// (Python + Pillow) and ships in this repository as entry.png. This
// program copies it to the output directory after checking that the
// shipped file really is a JPEG or PNG within the 1 MiB cap.
// Node 22, standard library only; no network. Deterministic: the same
// shipped bytes always produce the same output bytes.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

const bytes = readFileSync(source);

const MAX_BYTES = 1048576;
const MAX_DIMENSION = 1024;

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

// Whole-image checks: a JPEG must open with SOI + a marker and close
// with the EOI marker; a PNG must carry the full 8-byte signature.
const isJpeg =
  bytes.length > 4 &&
  bytes[0] === 0xff &&
  bytes[1] === 0xd8 &&
  bytes[2] === 0xff &&
  bytes[bytes.length - 2] === 0xff &&
  bytes[bytes.length - 1] === 0xd9;
const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const isPng =
  bytes.length > 24 && pngSignature.every((b, i) => bytes[i] === b);
if (!isJpeg && !isPng) {
  fail("entry.png is neither a whole JPEG nor a PNG (bad magic bytes)");
}
if (bytes.length > MAX_BYTES) {
  fail(`entry.png is ${bytes.length} bytes, over the 1 MiB limit`);
}

function pngDimensions(buf: Buffer): { width: number; height: number } | null {
  if (buf.length < 24 || buf.toString("ascii", 12, 16) !== "IHDR") {
    return null;
  }
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function jpegDimensions(buf: Buffer): { width: number; height: number } | null {
  let offset = 2; // skip SOI; SOF always precedes the scan data
  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) return null;
    const marker = buf[offset + 1];
    const length = buf.readUInt16BE(offset + 2);
    if (length < 2) return null;
    if (marker === 0xc0 || marker === 0xc2) {
      return {
        height: buf.readUInt16BE(offset + 5),
        width: buf.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + length;
  }
  return null;
}

const dimensions = isPng ? pngDimensions(bytes) : jpegDimensions(bytes);
if (!dimensions) {
  fail("entry.png dimensions could not be read from its header");
}
if (dimensions.width > MAX_DIMENSION || dimensions.height > MAX_DIMENSION) {
  fail(
    `entry.png is ${dimensions.width}x${dimensions.height}, ` +
      `over the ${MAX_DIMENSION}x${MAX_DIMENSION} limit`,
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(target, bytes);

const written = readFileSync(target);
if (!written.equals(bytes)) {
  console.error(
    `verification failed: ${target} (${written.length} bytes) does not match ` +
      `the shipped entry.png (${bytes.length} bytes)`,
  );
  process.exit(1);
}

console.log(
  `wrote ${target} (${bytes.length} bytes, ${isJpeg ? "JPEG" : "PNG"} ` +
    `${dimensions.width}x${dimensions.height})`,
);
