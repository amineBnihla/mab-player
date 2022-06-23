import {api} from "@/api"
import {onSnapshot,collection, deleteDoc,doc, getDoc} from "firebase/firestore";
import {db} from "@/firebase/config"

const state = () =>({
videos:[],
playlist:{}
})
const getters = {
    videos : state => state.videos
}
const mutations = {
     RESET_VIDEOS(state){
    console.log(state.videos)
   state.videos = []
  },
    SET_RESULTS(state,data){
        data = data.map((video)=>{
            video.snippet.thumbnails =  video.snippet.thumbnails.high.url
            return {id:video.id.videoId,...video.snippet}
        })

        console.log(data)
        state.videos = data
    },
  /*   SET_PLAYLIST(state,playlist){
        state.playlist = playlist
    } */
}
const actions={
    async fetchVideosOfPlaylist({state},playlistId){
        state.videos=[]
        try{

            const playlist =  await getDoc(doc(db,"playlists",playlistId))
            console.log(playlist.data())
            state.playlist = {id:playlist.id,...playlist.data()}
               const refColl=collection(db,"playlists",playlistId,"videos")
                 onSnapshot(refColl,(snapshot)=>{
                  snapshot.docChanges().forEach((change)=>{
                        if(change.type == "added"){
                          console.log(change.type)
                          state.videos.push({id:change.doc.id,...change.doc.data()})
                      }else if(change.type == "removed"){
                          state.videos = state.videos.filter((video)=> video.id != change.doc.id)
                      }
                  })
              },(error)=>{
                  console.log(error)
                  state.errors = error
              })
        }catch(err){
            throw new Error("playlist not exests")
        }
         
    },
async searchResults({state,commit},query){
     state.videos=[]
    console.log(query)
   await api.get(`search?part=snippet&maxResults=25&q=${query}&type=video&key=${process.env.VUE_APP_API_KEY}`)
   .then(({data})=>{
    
     commit('SET_RESULTS',data.items);
   })
},
async deleteVideo({state},videoId){
    try{
        console.log(state.playlist.id,videoId)
        await deleteDoc(doc(db,"playlists",state.playlist.id,"videos",videoId));
    }catch(err){
        console.log(err)
     throw new Error(err)
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