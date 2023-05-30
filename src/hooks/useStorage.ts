import {
  listAll,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getStorage,
  ref,
} from "firebase/storage";

export default function useStorage() {
  const storage = getStorage();

  const listFiles = async (path: string) => {
    const listRef = ref(storage, path);
    const all = await listAll(listRef);
    return all.items.map((item) => item.fullPath);
  };

  const uploadFiles = async (path: string, files: File[]) => {
    files.forEach((file) => {
      const storageRef = ref(storage, path + file.name);
      uploadBytes(storageRef, file);
    });
  };

  const getFile = async (path: string) => {
    try {
      const fileUrl = await getDownloadURL(ref(storage, path));
      return fileUrl;
    } catch (error) {
      console.log("get: file not found");
    }
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
    listFiles,
    uploadFiles,
    getFile,
    deleteFile,
  };
}
