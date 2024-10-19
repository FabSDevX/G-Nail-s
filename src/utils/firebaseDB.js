import { db, storageDB } from "../../firebase";
import { ref, uploadBytes, listAll, deleteObject, getDownloadURL } from 'firebase/storage';
import {
  addDoc, collection, getDoc,
  updateDoc, getDocs, deleteDoc,
  doc, where, query,
  arrayRemove,
  orderBy, setDoc,
  increment, Timestamp,
  onSnapshot
} from "firebase/firestore";

import dayjs from 'dayjs';

import { v4 } from "uuid";

import { getAuth, signOut } from "firebase/auth";

import { arraysEqual, differenceFirstArrayObjects } from "./utilsFunctions";

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
 * Add a course to wishlist collection
 * @param {string} courseId
 * @param {Object} data
 */
export async function addCourseToWishlist(courseId, data) {
  try {
    await setDoc(doc(db, "wishlist", courseId), data);
    console.log("Curso agregado a la wishlist correctamente");
  } catch (error) {
    console.error("Error al agregar el curso a la wishlist:", error);
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

export async function incrementCourseSelectionCount(courseId, courseName, date) {
  try {
    const docRef = doc(db, "course_selections", `${courseId}_${date}`);
    
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        selection_count: increment(1)
      });
    } else {
      await setDoc(docRef, {
        course_name: courseName,
        date: date,
        selection_count: 1
      });
    }
    console.log("Contador de selecciones actualizado correctamente para el curso:", courseId);

    const courseDocRef = doc(db, "Course", courseId);
    await updateDoc(courseDocRef, {
      views: increment(1)
    });

    console.log("Views actualizado correctamente en Course para el curso:", courseId);

  } catch (error) {
    console.error("Error al incrementar el contador de selecciones:", error);
  }
}

/**
 * Obtener selecciones de cursos en un rango de fechas
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns
 */
export async function getCourseSelectionsByDateRange(startDate, endDate) {
  try {
    // Convertir las fechas al formato adecuado para comparar solo la fecha sin tiempo
    const startDay = dayjs(startDate).format('YYYY-MM-DD');
    const endDay = dayjs(endDate).format('YYYY-MM-DD');

    // Crear la referencia a la colección `course_selections`
    const courseSelectionsRef = collection(db, "course_selections");

    // Crear una consulta con `where` para filtrar por fecha en el rango especificado
    const q = query(courseSelectionsRef,
      where("date", ">=", startDay),
      where("date", "<=", endDay)
    );

    // Obtener los documentos
    const querySnapshot = await getDocs(q);
    
    // Formatear la data
    const selections = [];
    querySnapshot.forEach((doc) => {
      selections.push({ ...doc.data(), id: doc.id });
    });

    return selections;
  } catch (error) {
    console.error("Error fetching course selections by date range:", error);
    throw error;
  }
}


export async function uploadCarouselImageByUrl(url, directoryPath, name){

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch image');
  }  

  const blob = await response.blob();
  const imgRef = ref(storageDB, `${directoryPath}/${name}-${v4()}`)
  await uploadBytes(imgRef, blob);
  const itemURL = await getDownloadURL(imgRef);
  return itemURL
}


export async function deleteDirectoryImages(directoryName, imageList){

  const directoryRef = ref(storageDB, directoryName)

  listAll(directoryRef)
  .then((result) => {
    const deletePromises = result.items.map(async (itemRef) => {
      
      const itemURL = await getDownloadURL(itemRef);
      
        if (!Object.values(imageList).includes(itemURL)) {
          return deleteObject(itemRef);
        } else {
          console.log(`El objeto con URL ${itemURL} no se eliminará porque está en la lista.`);
          return Promise.resolve(); 
        }
      

    });

    Promise.all(deletePromises)
      .then(() => {
        console.log('Carpeta "carousel" eliminada');            
      })
      .catch((error) => {
        console.error('Error al eliminar los archivos:', error);
      });
  })
  .catch((error) => {
    console.error('Error al listar los archivos:', error);
  });

}


export async function deleteImage(urlImage){

  const urlImageReference = ref(storageDB, urlImage);
    try {
      await deleteObject(urlImageReference);
    } catch (error) {
      console.error(error);
    }
  
}

export async function getCarouselImages(){
  const carouselRef = ref(storageDB, 'carousel');
  const result = await listAll(carouselRef);

  const urls = await Promise.all(result.items.map((itemRef) => getDownloadURL(itemRef)));

  const updatedImageList = {};
  urls.forEach((url, index) => {
    const key = url.match(/image-card-\d+/)[0];
    
    updatedImageList[key] = {'url':url, 'isStored': true};
  });

  return updatedImageList
}

export async function getAllImages(directoryName){
  const Ref = ref(storageDB, directoryName);
  const result = await listAll(Ref);

  const urls = await Promise.all(result.items.map((itemRef) => getDownloadURL(itemRef)));

  return urls
}

// -------------------Funciones para manejar reservas de cursos y la agenda -----------------------------
/**
 * Delete a scheduled courses
 * @param {string} collectionName
 * @param {string} documentID
 */
export async function deleteScheduledCoursesAndAgenda(documentID) {
  try {
    const docRef = await doc(db, "Scheduled Courses", documentID);
    let docData = await getDoc(docRef);
    docData = docData.data()
    let dates = docData.dates;
    dates = dates.map((e) => 
      e.date
    )
    await Promise.all(dates.map(async (date) => {
      const agendaRef = await doc(db, "Calendar", date);
      const docSnapshot = await getDoc(agendaRef);
      if(docSnapshot.data().scheduledCoursesUids.length == 1)
        await deleteDoc(agendaRef);
      else{
        await updateDoc(agendaRef, {
          scheduledCoursesUids: arrayRemove(documentID)
        });  
      }
    }))
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document: ");
  }
}

/**
 * Add or update a scheduled courses
 * @param {string} collectionName
 * @param {string} documentID (optional)
 * @param {JSON} jsonData
 */
export async function upsertScheduledCoursesAndAgenda(collectionName, documentID = null, jsonData) {
  try {
    if (documentID) {
      // NO SE HA IMPLEMENTADO AUN
      const docRef = doc(db, collectionName, documentID);
      let docSnapshot = await getDoc(docRef);
      const oldDates = docSnapshot.data().dates
      const newDates = jsonData.dates
      // console.log("Comparando ",JSON.stringify(oldDates), " con ", JSON.stringify(newDates))
      if(arraysEqual(oldDates, newDates)){
        console.log("No hubo cambio en la fechas")
        await updateDoc(docRef, jsonData);
      } 
      else {
        console.log("Si hubo cambio en las fechas")
        //Eliminar de la agenda las fechas que se borraron
        const datesToDelete = differenceFirstArrayObjects(oldDates, newDates) 
        //Las fechas que estan en el array viejo y que no estan en el nuevo es porque se borraron
        if(datesToDelete){
          console.log("Se borraron las fechas: ",JSON.stringify(datesToDelete))
          let dates = datesToDelete.map((e) => 
            e.date
          )
          await Promise.all(dates.map(async (date) => {
            const agendaRef = await doc(db, "Calendar", date);
            const docSnapshot = await getDoc(agendaRef);
            if(docSnapshot.data().scheduledCoursesUids.length == 1)
              await deleteDoc(agendaRef);
            else{
              await updateDoc(agendaRef, {
                scheduledCoursesUids: arrayRemove(documentID)
              });  
            }
          }))
        }

        //Agregar a la agenda las fechas que se insertaron
        const datesToInsert = differenceFirstArrayObjects(newDates, oldDates) 
        //Las fechas que estan en el array viejo y que no estan en el nuevo es porque se borraron
        if(datesToInsert){
          console.log("Se agregaron las fechas: ",JSON.stringify(datesToInsert))
          let dates = datesToInsert.map((e) => 
            e.date
          )
          for (const date of dates) {
            let agendaRef = doc(db, "Calendar", date);
            // Verificar si el documento existe
            let docSnapshot = await getDoc(agendaRef);
            if (docSnapshot.exists()) {
              const data = docSnapshot.data();
              const scheduledCoursesUids = data.scheduledCoursesUids || [];
              // Agregar el nuevo UID al array
              scheduledCoursesUids.push(docRef.id);
              // Actualizar el documento con el array modificado
              await updateDoc(agendaRef, { scheduledCoursesUids });
            } else {
              await setDoc(agendaRef, {
                scheduledCoursesUids: [docRef.id]
              });
            }
          }
        }
        await updateDoc(docRef, jsonData);
      }
      
      return documentID;
    } else {
      const docRef = await addDoc(collection(db, collectionName), jsonData);
      let dates = jsonData.dates
      dates = dates.map((e) => 
        e.date
      )
      for (const date of dates) {
        let agendaRef = doc(db, "Calendar", date);
        // Verificar si el documento existe
        let docSnapshot = await getDoc(agendaRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const scheduledCoursesUids = data.scheduledCoursesUids || [];
          // Agregar el nuevo UID al array
          scheduledCoursesUids.push(docRef.id);
          // Actualizar el documento con el array modificado
          await updateDoc(agendaRef, { scheduledCoursesUids });
        } else {
          await setDoc(agendaRef, {
            scheduledCoursesUids: [docRef.id]
          });
        }
      }
      return docRef.id;
    }
  } catch (error) {
    console.error("Error upserting document: ", error);
  }
}
/**
 * Log out the current user
 * @returns {Promise<void>}
 */

// Función para cerrar sesión (async/await)
export const logOutUser = async () => {
  const auth = getAuth();
  try {
    await signOut(auth); // Espera a que la sesión sea cerrada
    console.log("Usuario ha cerrado sesión correctamente");
  } catch (error) {
    console.error("Error al cerrar sesión: ", error);
  }
};
