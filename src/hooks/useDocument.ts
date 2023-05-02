import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

/**
 * Hook to access and manage a firestore document.
 * @param collectionName Collection name in plural (e.g. 'books'). Can also be a path to subcollection.
 * @returns
 */
// eslint-disable-next-line
export default function useDocument<T extends { [x: string]: any }>(
  collectionName: string,
  id: string,
  realtime = true
) {
  const db = getFirestore();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();

  const docRef = doc(db, collectionName, id);

  /**
   * Create or update a document in the given collection.
   * @param newVal A new record of collection type. Entire content will be overwritten!
   * @returns Id of the created document.
   */
  const upsert = async (newVal: T) => {
    await setDoc(docRef, newVal);
    return docRef.id;
  };

  /**
   * Refresh data, useful for non-realtime usage.
   * @returns updated data.
   */
  const refresh = async () => {
    setLoading(true);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as T;
    setData(data);
    setLoading(false);
    return data;
  };

  // Initial call to fill 'data' with all documents when precache is active.
  useEffect(() => {
    refresh();

    const unsub = realtime
      ? onSnapshot(docRef, (docSnap) => {
          const data = docSnap.data() as T;
          setData(data);
        })
      : // eslint-disable-next-line
        () => {};

    return unsub;
    // eslint-disable-next-line
  }, []);

  return { data, loading, upsert, refresh };
}
