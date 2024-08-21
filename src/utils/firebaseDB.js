import {
  addDoc, collection, getDoc,
  updateDoc, getDocs, deleteDoc,
  doc, where, query
} from "firebase/firestore";
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
    const docRef = await addDoc(collection(db, collectionName), jsonData);
    return docRef; // Retorna el docRef para obtener el ID generado
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export async function setDocumentByCollection(collectionName, jsonData) {
//   try {
//     await addDoc(collection(db, collectionName), {
//       jsonData,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

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
    } else {
      await addDoc(collection(db, collectionName), jsonData);
    }
  } catch (error) {
    console.error("Error upserting document: ", error);
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

