import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export async function getDocumentById(collectionName, documentID){
    const docRef = doc(db,collectionName,documentID)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
        return docSnap.data();
    }else{
        console.error("No such document")
    }

}