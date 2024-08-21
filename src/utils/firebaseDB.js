import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storageDB } from "../../firebase";
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';


/**
 * Get a specific document in a collection
 * @param {string} collectionName
 * @param {string} documentID
 * @returns
 */
export async function getDocumentById(collectionName, documentID) {
  const docRef = doc(db, collectionName, documentID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.error("No such document");
  }
}

/**
 * Set a new document in a collection
 * @param {string} collectionName
 * @param {JSON} jsonData
 */
export async function setDocumentByCollection(collectionName, jsonData) {
  try {
    await addDoc(collection(db, collectionName), {
      jsonData,
    });
  } catch (error) {
    console.error(error);
  }
}

/**
 * Update custom fields for a specific document in a collection
 * @param {string} collectionName
 * @param {string} documentID
 * @param {JSON} jsonData
 */
export async function updateDocumentById(collectionName, documentID, jsonData) {
  const docRef = doc(db, collectionName, documentID);
  await updateDoc(docRef, jsonData);
}

export async function uploadImageByUrl(url, directoryPath){

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch image');
  }  

  const blob = await response.blob();
  const imgRef = ref(storageDB, `${directoryPath}/${v4()}`)  
  await uploadBytes(imgRef, blob);

}