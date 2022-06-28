
import {collection,onSnapshot,addDoc,doc,updateDoc, deleteDoc,setDoc, getDoc} from "firebase/firestore";
import {db} from "@/firebase/config"
import {fileUpload,deleteFile} from "@/helpers/fileUpload"


const state = () =>({
playlists:[]
})
const getters = {
   playlists : (state) => state.playlists
    
}
const mutations = {
 
    SET_RESULTS(state,data){
        data = data.map((video)=>{
            return {id:video.id,...video.snippet}
        })
        state.videos = data
    },
 
}
async function checkImage(image,oldImage){
      if(typeof image != "string"){
        image =  await fileUpload('playlist',image,oldImage)
      }
      return image
}
const actions={
  async  addPlaylist({rootState},data){
    try{
        const downloadURL = await checkImage(data.image)
 addDoc(collection(doc(db,"users",rootState.auth.user.uid),'playlists'),{
  title:data.title,
  description:data.description,
  image:`${downloadURL}`
})
   }catch(err){

        throw new Error('Something went wrong')
   }
   
     
    },
  async  updatePlaylist({rootState},data){
     try{
       let downloadURL = await checkImage(data.image,data.oldImage)
    
       updateDoc(doc(collection(doc(db,"users",rootState.auth.user.uid),'playlists'),data.id),{
        title:data.title,
        description:data.description,
        image:`${downloadURL}`
       })
     }catch(err){
              throw new Error('Something went wrong')
     }
      
    },
  async deletePlylist({rootState},id){
    const user_uid = rootState.auth.user.uid
    try{
      const docSnapshot = await  getDoc(doc(collection(doc(db,"users",user_uid),'playlists'),id))
      
     await deleteFile(docSnapshot.data().image);
      await deleteDoc(doc(collection(doc(db,"users",user_uid),'playlists'),id))
    }catch(err){
        throw new Error('Something went wrong')
    }
  
   
    },
 
     fetch_playlists({state,rootState}){
   return new Promise((resolve)=>{
   onSnapshot(collection(doc(db,"users",rootState.auth.user.uid),'playlists'),(snapshot)=>{
    if(snapshot.size > 0){
    snapshot.docChanges().forEach((change)=>{
                if(change.type == "added"){
                  const playlist = state.playlists.find((playlist)=>playlist.id==change.doc.id)
                  if(!playlist){
                    state.playlists.push({id:change.doc.id,...change.doc.data()})
                  } 
               
                }else if(change.type == "modified"){
                  state.playlists = state.playlists.map((playlist)=>{
                    if(playlist.id == change.doc.id){
                      playlist = {id:change.doc.id,...change.doc.data()}
                    }
                    return playlist
                  })
                 
                }else if(change.type == "removed"){
                  state.playlists = state.playlists.filter((playlist)=> playlist.id != change.doc.id)
                
                }
            })
    }
           resolve()
        })

     }) 
    },
 fetch_playlist_by_id({state},id){
    let playlist = state.playlists.find((item)=> item.id == id)
    return playlist

},
async addVideoToPlaylist({rootState},{playlistId,video}){
     
    const docVideo = doc(db,"users",rootState.auth.user.uid,"playlists",playlistId)
    const refVideo = doc(docVideo,"videos",video.id)
  try{
    const result = await getDoc(refVideo)
    if(result.exists()){
        return false;
    }
    await  setDoc(refVideo,{
     title:video.title,
     decscription:video.description,
     thumbnails:video.thumbnails
    })
    
    return true
    
  }catch(err){
    throw new Error('something went wrong')
  }
 
}
}

export default{
     namespaced: true,
    state,
    getters,
    mutations,
    actions,

}