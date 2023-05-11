import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  limitToLast,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

/**
 * Hook to access and manage a firestore collection.
 * @param collectionName Collection name in plural (e.g. 'books'). Can also be a path to subcollection.
 * @param precache Should all records be loaded when hook starts? default is true. Avoid using with big collections.
 * @returns
 */
// eslint-disable-next-line
export default function useCollection<T extends { [x: string]: any }>(
  collectionName: string,
  precache = true
) {
  const db = getFirestore();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Array<T>>([]);

  /**
   * Create a new document in the collection.
   * @param newVal A new record of collection type.
   * @returns Id of the created document.
   */
  const create = async (newVal: T) => {
    const docRef = await addDoc(collection(db, collectionName), newVal);
    return docRef.id;
  };

  /**
   * Remove a document from collection.
   * @param id Document id to be removed.
   */
  const remove = async (id: string) => {
    await deleteDoc(doc(db, collectionName, id));
  };

  /**
   * Update a document in the collection.
   * @param id Document id to be updated.
   * @param newVal New value for the given document (overrides the entire Document!).
   */
  const update = async (id: string, newVal: T) => {
    if (newVal.id) delete newVal.id;
    await updateDoc(doc(db, collectionName, id), newVal);
  };

  /**
   * Get all documents from the collection.
   * @returns An array of the collection type with all elements.
   */
  const all = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, collectionName));
    const dataAsMap = querySnapshot.docs.map((doc) => {
      const data = doc.data() as T;
      return { id: doc.id, ...data };
    });
    setData(dataAsMap);
    setLoading(false);
    return dataAsMap;
  };

  /**
   * Alias to refetch all.
   */
  const refreshData = () => {
    all();
  };

  // Initial call to fill 'data' with all documents when precache is active.
  useEffect(() => {
    if (precache) all();
    // eslint-disable-next-line
  }, []);

  // Custom functions

  /**
   * Get documents (limited) from the collection ordering by a given attribute.
   * @returns An array of the collection type with filtered elements.
   */
  const filterLast = async (limit: number, orderAttribute: string) => {
    const q = query(
      collection(db, collectionName),
      orderBy(orderAttribute, "asc"),
      limitToLast(limit)
    );

    const querySnapshot = await getDocs(q);
    const dataAsMap = querySnapshot.docs.map((doc) => {
      const data = doc.data() as T;
      return { id: doc.id, ...data };
    });

    return dataAsMap.reverse();
  };

  return {
    data,
    loading,
    create,
    remove,
    update,
    all,
    refreshData,
    filterLast,
  };
}
