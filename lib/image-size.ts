import fs from "fs/promises";
import path from "path";

export interface ImageSize {
  width: number;
  height: number;
}

/**
 * Read intrinsic pixel dimensions from a JPEG or PNG file living under public/.
 *
 * Runs at build time only (reads from disk). Parses just the file headers — the
 * PNG IHDR chunk or the JPEG Start-Of-Frame marker — rather than pulling in an
 * image library. Returns null for unreadable or unsupported files so callers can
 * fall back gracefully.
 *
 * @param publicPath a root-relative path as stored in frontmatter, e.g. "/images/coffee/foo.jpg"
 */
export async function readImageSize(
  publicPath: string
): Promise<ImageSize | null> {
  try {
    const filePath = path.join(process.cwd(), "public", publicPath);
    const buf = await fs.readFile(filePath);
    if (buf.length < 24) return null;

    // PNG: 8-byte signature (89 50 4E 47 0D 0A 1A 0A), then the IHDR chunk whose
    // width/height are big-endian uint32 at byte offsets 16 and 20.
    if (
      buf[0] === 0x89 &&
      buf[1] === 0x50 &&
      buf[2] === 0x4e &&
      buf[3] === 0x47
    ) {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }

    // JPEG: begins with SOI (FF D8). Walk the marker segments until the
    // Start-Of-Frame (SOF0..SOF15) which encodes height then width; this covers
    // both baseline (SOF0) and progressive (SOF2) photos.
    if (buf[0] === 0xff && buf[1] === 0xd8) {
      let offset = 2;
      while (offset + 9 < buf.length) {
        // Markers are byte-aligned to 0xFF; skip any fill bytes.
        if (buf[offset] !== 0xff) {
          offset++;
          continue;
        }
        const marker = buf[offset + 1];
        // Standalone markers with no length payload: fill (FF), SOI, EOI, RSTn.
        if (
          marker === 0xff ||
          marker === 0xd8 ||
          marker === 0xd9 ||
          (marker >= 0xd0 && marker <= 0xd7)
        ) {
          offset += 2;
          continue;
        }
        const len = buf.readUInt16BE(offset + 2);
        // SOF markers (C0–CF) carry frame dimensions, excluding DHT (C4),
        // DAC (CC), and the reserved JPGn markers.
        const isSOF =
          marker >= 0xc0 &&
          marker <= 0xcf &&
          marker !== 0xc4 &&
          marker !== 0xc8 &&
          marker !== 0xcc;
        if (isSOF) {
          const height = buf.readUInt16BE(offset + 5);
          const width = buf.readUInt16BE(offset + 7);
          if (width > 0 && height > 0) return { width, height };
        }
        offset += 2 + len;
      }
    }

    return null;
  } catch {
    return null;
  }
}
