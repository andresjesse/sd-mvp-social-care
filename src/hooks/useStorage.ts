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
    const storageRef = ref(storage, path);
    const all = await listAll(storageRef);
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
    const storageRef = ref(storage, path);
    const fileUrl = await getDownloadURL(storageRef);
    return fileUrl;
  };

  const deleteFile = async (path: string) => {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  };

  return {
    loading,
    listFiles,
    uploadFiles,
    getFileUrl,
    deleteFile,
  };
}