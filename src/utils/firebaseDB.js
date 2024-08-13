import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export async function getDocumentById(collectionName, documentID) {
  const docRef = doc(db, collectionName, documentID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.error("No such document");
  }
}

export async function setDocumentByCollection(collectionName, jsonData) {
  try {
    await addDoc(collection(db, collectionName), {
      jsonData,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateDocumentById(collectionName, documentID, jsonData){
    const docRef = doc(db, collectionName, documentID);
    await updateDoc(docRef, jsonData);
}
