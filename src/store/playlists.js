
import {collection,onSnapshot,addDoc,doc,updateDoc, deleteDoc,setDoc, getDoc} from "firebase/firestore";
import {db} from "@/firebase/config"
import {fileUpload,deleteFile} from "@/helpers/fileUpload"



let playlistCollection = collection(db,'playlists');
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
        console.log(data)
        state.videos = data
    },
 
}
async function checkImage(image){
      if(typeof image != "string"){
        image =  await fileUpload('playlist',image)
      }
      return image
}
const actions={
  async  addPlaylist(_,data){
      try{
        const downloadURL = await checkImage(data.image)
        console.log(downloadURL)
 addDoc(playlistCollection,{
  title:data.title,
  description:data.description,
  image:`${downloadURL}`
})
   }catch(err){
        throw new Error('Something went wrong')
   }
   
     
    },
  async  updatePlaylist(_,data){
     try{
       let downloadURL = await checkImage(data.image)
        console.log(data)
       updateDoc(doc(db,'playlists',data.id),{
        title:data.title,
        description:data.description,
        image:`${downloadURL}`
       })
     }catch(err){
              throw new Error('Something went wrong')
     }
      
    },
  async deletePlylist(_,id){
    try{
     await deleteFile(id);
      await deleteDoc(doc(db,'playlists',id))
    }catch(err){
        throw new Error('Something went wrong')
    }
  
   
    },
 
     fetch_playlists({state}){
   return new Promise((resolve,reject)=>{
   onSnapshot(playlistCollection,(snapshot)=>{
            snapshot.docChanges().forEach((change)=>{
                if(change.type == "added"){
                    console.log(change)
                  const playlist = state.playlists.find((playlist)=>playlist.id==change.doc.id)
                  if(!playlist){
                    state.playlists.push({id:change.doc.id,...change.doc.data()})
                  } 
                  resolve('added')
                }else if(change.type == "modified"){
                  state.playlists = state.playlists.map((playlist)=>{
                    if(playlist.id == change.doc.id){
                      playlist = {id:change.doc.id,...change.doc.data()}
                    }
                    return playlist
                  })
                  resolve('modified')
                }else if(change.type == "removed"){
                  state.playlists = state.playlists.filter((playlist)=> playlist.id != change.doc.id)
                  resolve('removed')
                }
            })
        },(error)=>{
            console.log(error)
            state.errors = error
            reject(error)
        })

     }) 
    },
 fetch_playlist_by_id({state},id){
    let playlist = state.playlists.find((item)=> item.id == id)
    return playlist

},
async addVideoToPlaylist(_,{playlistId,video}){
     
    const docVideo = doc(db,"playlists",playlistId)
    const refVideo = doc(docVideo,"videos",video.id)
  try{
      console.log(playlistId,video)
    const result = await getDoc(refVideo)
    console.log(result)
    if(result.exists()){
        console.log(result.exists())
        return false;
    }
    await  setDoc(refVideo,{
     title:video.title,
     decscription:video.description,
     thumbnails:video.thumbnails
    })
    
    return true
    
  }catch(err){
     console.log(err)
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