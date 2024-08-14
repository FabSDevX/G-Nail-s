import { addDoc, collection, getDoc, updateDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

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
  try {
    const docRef = doc(db, collectionName, documentID);
    await updateDoc(docRef, jsonData);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}



//---- Admin Management ----
/**
 * Get all documents from a specific collection
 * @param {string} collectionName
 * @returns {Array} Array of document data
 */
export async function getAllDocuments(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return documents;
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return [];
  }
}


/**
 * Delete a document by its ID
 * @param {string} collectionName
 * @param {string} documentID
 */
export async function deleteDocumentById(collectionName, documentID) {
  try {
    const docRef = doc(db, collectionName, documentID);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}



/**
 * Add or update a document in a collection
 * @param {string} collectionName
 * @param {string} documentID (optional)
 * @param {JSON} jsonData
 */
export async function upsertDocument(collectionName, documentID = null, jsonData) {
  try {
    if (documentID) {
      const docRef = doc(db, collectionName, documentID);
      await updateDoc(docRef, jsonData);
    } else {
      await addDoc(collection(db, collectionName), jsonData);
    }
  } catch (error) {
    console.error("Error upserting document: ", error);
  }
}
