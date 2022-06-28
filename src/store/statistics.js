import {api} from "@/api"
import {onSnapshot,collection} from "firebase/firestore";
import {db} from "@/firebase/config"
const collPlaylists = collection(db,"playlists");
const state = () =>({
videos_count:0,
playlist_count:0
})
const getters = {
    videos_count : state => state.videos_count,
    playlist_count : state => state.playlist_count,
}
const mutations = {


}
const actions={
  
async searchResults({state,commit},query){
     state.videos=[]
    console.log(query)
   await api.get(`search?part=snippet&maxResults=25&q=${query}&type=video&key=${process.env.VUE_APP_API_KEY}`)
   .then(({data})=>{
    
     commit('SET_RESULTS',data.items);
   })
},
 videos_count({state}){
  
        onSnapshot(collPlaylists, (querySnapshot) => {
  console.log(querySnapshot.size);
  state.playlist_count = querySnapshot.size ;

  console.log(state);
});

 
}


}


export default{
     namespaced: true,
    state,
    getters,
    mutations,
    actions,

}