export default function isImage(fileExtension: string | undefined) {
  const extension = (fileExtension || "").toLowerCase();

  switch (extension) {
    default:
      return false;

    case "apng":
    case "gif":
    case "ico":
    case "cur":
    case "jpg":
    case "jpeg":
    case "jfif":
    case "pjpeg":
    case "pjp":
    case "png":
    case "svg":
      return true;
  }
}

//source: https://www.w3schools.com/html/html_images.asp
