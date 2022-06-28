import { storage } from "@/firebase/config"
import {ref,uploadBytes,getDownloadURL,deleteObject} from "firebase/storage"

export async function fileUpload(path,file,oldFile=""){
  try{
    if(oldFile !== ""){
 await deleteFile(oldFile);
  }
 const storageRef = ref(storage,`${path}/${file.name}`)
  let snapshot = await  uploadBytes(storageRef,file)
  let downloadURL = await getDownloadURL(snapshot.ref)
  return downloadURL
  }catch(err){
 throw Error('something went wrong')
  }
  
       
}
export async function  deleteFile(oldFile){
  try{

   const prevRef = ref(storage,oldFile)
  await deleteObject(prevRef)
  }catch(err){
    if(err.message.includes("(storage/object-not-found)")){
    return false
    }else{
      throw new Error(err)

    }
  }
    

}
