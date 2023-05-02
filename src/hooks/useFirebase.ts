import { useEffect, useState } from "react";

import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "@firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "@firebase/firestore";

/**
 * Firebase initialization. This hook should be called in App's entry point.
 * @param firebaseConfig Your firebase project config for web SDK.
 * @returns Firebase app when firebase is completely loaded, null otherwise (make sure to conditionally check this in App entrypoint!).
 */
export default function useFirebase(firebaseConfig: FirebaseOptions) {
  const [app, setApp] = useState<FirebaseApp | null>(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);

    if (process.env.NODE_ENV === "test") {
      console.log("Connecting to emulators...");

      connectAuthEmulator(getAuth(), "http://localhost:9099");
      connectFirestoreEmulator(getFirestore(), "localhost", 8080);
    }

    setApp(app);
  }, [firebaseConfig]);

  return app;
}
