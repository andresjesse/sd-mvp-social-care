import { useEffect, useState } from "react";

import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";

export default function useFirebase(firebaseConfig: FirebaseOptions) {
  const [app, setApp] = useState<FirebaseApp | null>(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setApp(app);
  }, []);

  return app;
}
