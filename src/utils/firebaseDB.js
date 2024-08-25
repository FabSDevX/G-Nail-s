import { db, storageDB } from "../../firebase";
import { v4 } from "uuid";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc, collection, getDoc,
  updateDoc, getDocs, deleteDoc,
  doc, where, query,
  onSnapshot
} from "firebase/firestore";

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
    const docRef = await addDoc(collection(db, collectionName), jsonData);
    return docRef; // Retorna el docRef para obtener el ID generado
  } catch (error) {
    console.error(error);
    throw error;
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
    const docRef = doc(db, collectionName, documentID); // Utiliza el id de Firebase aquí
    await updateDoc(docRef, jsonData);
  } catch (error) {
    console.error("Error updating document: ");
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
    console.error("Error fetching documents: ");
    return [];
  }
}


//USAGE EXAMPLE
// useEffect(() => {
//   const unsubscribe = listenToCollectionChanges("Course", (documents) => {
//     setValues(documents);
//   });

//   return () => unsubscribe && unsubscribe();
// }, []);

export function listenToCollectionChanges(collectionName, callback) {
  try {
    const collectionRef = collection(db, collectionName);
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(documents);
    });

    return unsubscribe;
  } catch (error) {
    console.error("Error listening to collection changes: ", error);
    return null;
  }
}

/**
 * Delete a document by its ID
 * @param {string} collectionName
 * @param {string} documentID
 */
export async function deleteDocumentById(collectionName, documentID, isDeletingImage=false) {
  try {
    const docRef = doc(db, collectionName, documentID);
    const docData = await getDocumentById(collectionName, documentID);
    await deleteDoc(docRef);
    if (isDeletingImage) {
      const ImageRef = ref(storageDB, docData.img);
      try {
        await deleteObject(ImageRef);
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.error("Error deleting document: ");
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
      return documentID;
    } else {
      const docRef = await addDoc(collection(db, collectionName), jsonData);
      return docRef.id;
    }
  } catch (error) {
    console.error("Error upserting document: ", error);
  }
}

/**
 * function to upload an image to firestore
 * @param {string} url image url
 * @param {string} directoryPath firebase folder name
 * @param {string} previousImagePath optional previous image path to delete
 * @returns
 */
export async function uploadImageByUrl(url, directoryPath, previousImagePath=null){
  if (previousImagePath) {
    const previousImageRef = ref(storageDB, previousImagePath);
    try {
      await deleteObject(previousImageRef);
    } catch (error) {
      console.error(error);
    }
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch image");
  }

  const blob = await response.blob();
  const imgRef = ref(storageDB, `${directoryPath}/${v4()}`);
  await uploadBytes(imgRef, blob);
  return imgRef.fullPath;
}

/**
 * Function to get an image from firebase path
 * @param {string} path
 * @returns downloadUrl image
 */
export async function getImageByUrl(path) {
  try {
    const imgRef = ref(storageDB, path);
    const downloadURL = await getDownloadURL(imgRef);
    return downloadURL;
  } catch (error) {
    throw new Error("Failed to fetch image URL: " + error.message);
  }
}

/**
 * Verifica si un usuario está permitido basado en su correo electrónico.
 * @param {string} email - El correo electrónico del usuario.
 * @returns {boolean} - True si el usuario está permitido, false en caso contrario.
 */
export async function isUserAllowed(email) {
  try {
    const sanitizedEmail = email.trim().toLowerCase();
    const allowedUsersRef = collection(db, "allowedUsers");
    const q = query(allowedUsersRef, where("gmail", "==", sanitizedEmail));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error verificando el usuario permitido:", error);
    return false;
  }
}
