
import { db, storageDB } from "../../firebase";
import { v4 } from "uuid";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc, collection, getDoc,
  updateDoc, getDocs, deleteDoc,
  doc, where, query, orderBy, setDoc,
  increment, Timestamp
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
export async function uploadImageByUrl(url, directoryPath, previousImagePath = null) {

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
    throw new Error('Failed to fetch image');
  }

  const blob = await response.blob();
  const imgRef = ref(storageDB, `${directoryPath}/${v4()}`)
  await uploadBytes(imgRef, blob);
  return imgRef.fullPath
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
    throw new Error('Failed to fetch image URL: ' + error.message);
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


/**
 * Fetch visit data from Firebase within a date range
 * @param {Date} startDate - Start of the date range
 * @param {Date} endDate - End of the date range
 * @returns {Array} List of visits with date and visit_count
 */
export async function getVisitsByDateRange(startDate, endDate) {
  try {
    const visitsCollectionRef = collection(db, 'website_visits');

    const visitQuery = query(
      visitsCollectionRef,
      where('date', '>=', startDate),
      where('date', '<=', endDate),
      orderBy('date')
    );

    const querySnapshot = await getDocs(visitQuery);

    const visits = querySnapshot.docs.map(doc => ({
      date: doc.data().date.toDate(),  // Convert to JS Date object
      visit_count: doc.data().visit_count
    }));

    return visits;
  } catch (error) {
    console.error("Error fetching visits by date range:", error);
    throw error;
  }
}



/**
 * Track visits by incrementing the visit count for the current day.
 */
export async function trackVisit() {
  const today = new Date().toISOString().split('T')[0];  // Obtiene la fecha actual en formato YYYY-MM-DD
  const docRef = doc(db, 'website_visits', today);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // Si el documento existe, incrementamos el contador de visitas
    const newCount = docSnap.data().visit_count + 1;
    await updateDoc(docRef, { visit_count: newCount });
  } else {
    // Si no existe, creamos el documento con visit_count = 1
    await setDoc(docRef, { visit_count: 1, date: new Date() });
  }
}
/**
 * Track course selections by incrementing the selection count for a specific course.
 */
export async function trackCourseSelection(courseId, courseName) {
  const docRef = doc(db, 'course_selections', courseId);  // Utiliza solo el courseId como ID del documento

  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    // Si ya existe un documento para este curso, incrementamos el contador
    await updateDoc(docRef, {
      selection_count: increment(1),
      timestamp: Timestamp.now()  // Actualiza el timestamp
    });
  } else {
    // Si no existe, creamos un nuevo documento para registrar la selección
    await setDoc(docRef, {
      course_name: courseName,
      course_id: courseId,
      selection_count: 1,
      timestamp: Timestamp.now(),  // Guarda el timestamp actual
      date: Timestamp.now()  // Usa también un timestamp para el campo 'date'
    });
  }
}



/**
 * Gety course selections by date range
 * @param {Date} startDate - Start of the date range
 * @param {Date} endDate - End of the date range
 * @returns {Array} List of course selections with date and selection_count
 */
export const getCourseSelectionsByDateRange = async (startDate, endDate) => {
  try {
    const courseSelectionsRef = collection(db, 'course_selections');  // Referencia a la colección
    const q = query(
      courseSelectionsRef,
      where('date', '>=', startDate),  // Filtra por fecha de inicio
      where('date', '<=', endDate)     // Filtra por fecha de fin
    );

    const querySnapshot = await getDocs(q);  // Ejecuta la consulta
    const selections = [];

    querySnapshot.forEach((doc) => {
      selections.push({
        id: doc.id,
        ...doc.data()  // Agrega los datos del documento
      });
    });

    return selections;  // Retorna un array con los datos
  } catch (error) {
    console.error('Error fetching course selections:', error);
    throw new Error('Error fetching course selections');
  }
};

