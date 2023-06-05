export default function isImage(fileExtension: string | undefined) {
  const extension = (fileExtension + "").toLowerCase();

  switch (extension) {
    default:
      return false;

    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
    case "tiff":
    case "raw":
      return true;
  }
}
// Other possibles 'image' types
// EXIF, PPM, PGM, PBM e PNM.
