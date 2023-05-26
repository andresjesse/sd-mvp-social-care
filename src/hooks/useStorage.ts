import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";

export default function useStorage() {
  const storage = getStorage();

  const uploadFiles = async (path: string, files: File[]) => {
    files.forEach((file) => {
      const storageRef = ref(storage, path + file.name);
      uploadBytes(storageRef, file);
    });
  };

  const listFiles = async (path: string) => {
    const listRef = ref(storage, path);
    const all = await listAll(listRef);

    // all.prefixes.forEach((folderRef) => {
    //   // All the prefixes under listRef.
    //   // You may call listAll() recursively on them.
    // });

    // all.items.forEach((itemRef) => {
    //   console.log(itemRef.fullPath);
    // });

    return all.items;
  };

  const deleteFile = async (path: string) => {
    const desertRef = ref(storage, path);
    try {
      await deleteObject(desertRef);
    } catch (error) {
      console.log("delete: file not found");
    }
  };

  const getFile = async (path: string) => {
    try {
      return await getDownloadURL(ref(storage, path));
    } catch (error) {
      console.log("get: file not found");
    }
  };

  return {
    uploadFiles,
    listFiles,
    deleteFile,
    getFile,
  };
}
