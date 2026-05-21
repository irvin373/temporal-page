import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
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
    status: "new",
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getApplications() {
  const q = query(
    collection(db, "applications"),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function updateApplicationStatus(id: string, status: string) {
  const docRef = doc(db, "applications", id);
  await updateDoc(docRef, { status });
}

export async function deleteApplication(id: string) {
  const docRef = doc(db, "applications", id);
  await deleteDoc(docRef);
}
