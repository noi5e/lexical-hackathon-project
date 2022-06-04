import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export const useDocument = (collection) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // realtime data for document
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc();
    console.log("REF: ", ref);
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot });
          setError(null);
        } else {
          setError(" No Such Document Exist");
        }
      },
      (err) => {
        console.log(err.message);
        setError("Failed to get the requested document");
      }
    );

    return () => unsubscribe();
  }, [collection]);

  return { document, error };
};
