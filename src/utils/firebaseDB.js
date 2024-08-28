import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storageDB } from "../../firebase";
import { ref, uploadBytes, listAll, deleteObject, getDownloadURL } from 'firebase/storage';
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
  const itemURL = await getDownloadURL(imgRef);
  return itemURL
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
      
        // Verifica si la URL del item está en la lista de URLs a conservar
        if (!Object.values(imageList).includes(itemURL)) {
          return deleteObject(itemRef);
        } else {
          console.log(`El objeto con URL ${itemURL} no se eliminará porque está en la lista.`);
          return Promise.resolve(); // Resuelve la promesa sin eliminar
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

  // Establece las imágenes en los ImageUploadCard correspondientes
  const updatedImageList = {};
  urls.forEach((url, index) => {
    const key = url.match(/image-card-\d+/)[0];
    
    updatedImageList[key] = {'url':url, 'isStored': true};
  });
  
  return updatedImageList
}

