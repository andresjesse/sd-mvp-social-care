import {
  listAll,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getStorage,
  ref,
} from "firebase/storage";
import { useState } from "react";

export default function useStorage() {
  const [loading, setLoading] = useState(false);
  const storage = getStorage();

  const listFiles = async (path: string) => {
    const listRef = ref(storage, path);
    const all = await listAll(listRef);
    return all.items.map((item) => item.fullPath);
  };

  const uploadFiles = async (path: string, files: File[]) => {
    setLoading(true);
    for (const file of Array.from(files)) {
      const storageRef = ref(storage, path + file.name);
      await uploadBytes(storageRef, file);
    }
    setLoading(false);
  };

  const getFileUrl = async (path: string) => {
    const fileUrl = await getDownloadURL(ref(storage, path));
    return fileUrl;
  };

  const deleteFile = async (path: string) => {
    const desertRef = ref(storage, path);
    try {
      await deleteObject(desertRef);
    } catch (error) {
      console.log("delete: file not found");
    }
  };

  return {
    loading,
    listFiles,
    uploadFiles,
    getFileUrl,
    deleteFile,
  };
}
