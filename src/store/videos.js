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

   state.videos = []
  },
    SET_RESULTS(state,data){
        data = data.map((video)=>{
            video.snippet.thumbnails =  video.snippet.thumbnails.high.url
            return {id:video.id.videoId,...video.snippet}
        })

        state.videos = data
    },
  /*   SET_PLAYLIST(state,playlist){
        state.playlist = playlist
    } */
}
const actions={
    async fetchVideosOfPlaylist({state,rootState},playlistId){
        state.videos=[]
        try{

            const playlist =  await getDoc(doc(db,"users",rootState.auth.user.uid,"playlists",playlistId))
            state.playlist = {id:playlist.id,...playlist.data()}
               const refColl=collection(db,"users",rootState.auth.user.uid,"playlists",playlistId,"videos")
                 onSnapshot(refColl,(snapshot)=>{
                  snapshot.docChanges().forEach((change)=>{
                        if(change.type == "added"){
                          state.videos.push({id:change.doc.id,...change.doc.data()})
                      }else if(change.type == "removed"){
                          state.videos = state.videos.filter((video)=> video.id != change.doc.id)
                      }
                  })
              })
        }catch(err){
            throw new Error("playlist not exests")
        }
         
    },
async searchResults({state,commit},query){
     state.videos=[]
   await api.get(`search?part=snippet&maxResults=25&q=${query}&type=video&key=${process.env.VUE_APP_API_KEY}`)
   .then(({data})=>{ 
     commit('SET_RESULTS',data.items);
   })
},
async deleteVideo({state,rootState},videoId){
    try{
    await deleteDoc(doc(db,"users",rootState.auth.user.uid,"playlists",state.playlist.id,"videos",videoId));
    }catch(err){
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