import {
  faFile,
  faFileExcel,
  faFileLines,
  faFilePdf,
  faFilePowerpoint,
  faFileVideo,
  faFileWord,
  faFileZipper,
} from "@fortawesome/free-solid-svg-icons";

export default function fileExtensionToFontAwesomeIcon(
  fileExtension: string | undefined
) {
  const extension = (fileExtension || "").toLowerCase();

  switch (extension) {
    default:
      return faFile;

    case "docx":
    case "doc":
    case "odt":
      return faFileWord;

    case "pdf":
    case "odf":
      return faFilePdf;

    case "mp4":
    case "mkv":
    case "avi":
      return faFileVideo;

    case "xlsx":
    case "xls":
    case "ods":
      return faFileExcel;

    case "pptx":
    case "odp":
      return faFilePowerpoint;

    case "zip":
    case "rar":
    case "gz":
      return faFileZipper;

    case "txt":
      return faFileLines;
  }
}
