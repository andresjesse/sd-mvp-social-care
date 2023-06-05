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

  const listFiles = async (path: string): Promise<string[]> => {
    setLoading(true);
    const storageRef = ref(storage, path);
    const all = await listAll(storageRef);
    setLoading(false);
    return all.items.map((item) => item.fullPath);
  };

  const uploadFiles = async (path: string, files: File[]): Promise<void> => {
    setLoading(true);
    for (const file of Array.from(files)) {
      const storageRef = ref(storage, path + file.name);
      await uploadBytes(storageRef, file);
    }
    setLoading(false);
  };

  const getFileUrl = async (path: string): Promise<string> => {
    setLoading(true);
    const storageRef = ref(storage, path);
    const fileUrl = await getDownloadURL(storageRef);
    setLoading(false);
    return fileUrl;
  };

  const deleteFile = async (path: string): Promise<void> => {
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
