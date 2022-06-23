import { storage,db } from "@/firebase/config"
import {getDoc,doc} from "firebase/firestore"
import {ref,uploadBytes,getDownloadURL,deleteObject} from "firebase/storage"

export async function fileUpload(path,file,id=""){
  try{
    if(id !== ""){
 await deleteFile(id);
  }
 const storageRef = ref(storage,`${path}/${file.name}`)
  let snapshot = await  uploadBytes(storageRef,file)
  let downloadURL = await getDownloadURL(snapshot.ref)
  return downloadURL
  }catch(err){
 throw Error('something went wrong')
  }
  
       
}
export async function  deleteFile(id){
  try{
      const docSnapshot = await  getDoc(doc(db,"playlists",id))
      console.log(id,docSnapshot.data().image)
      
   /* await getDownloadURL(ref(storage,docSnapshot.data().image))
   .then(()=>{
  console.log('right')
   }).catch((err)=>{
    console.log(err)
   })
    */
   const prevRef = ref(storage,docSnapshot.data().image)
   console.log(prevRef)
  await deleteObject(prevRef)
  }catch(err){
    if(err.message.includes("(storage/object-not-found)")){
    return false
    }else{
      throw new Error(err)

    }
  }
    

}
