import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

export async function submitApplication(formData: Record<string, any>) {
  const { resumeFile, ...data } = formData;

  let resumeURL = "";

  if (resumeFile instanceof File) {
    const fileRef = ref(
      storage,
      `applications/resumes/${Date.now()}_${resumeFile.name}`
    );
    const snapshot = await uploadBytes(fileRef, resumeFile);
    resumeURL = await getDownloadURL(snapshot.ref);
  }

  const docRef = await addDoc(collection(db, "applications"), {
    ...data,
    resumeURL,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}
