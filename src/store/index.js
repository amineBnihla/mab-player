import { createStore } from 'vuex'
import videos from './videos'
import playlists from './playlists'
import auth from './auth'
export default createStore({
  state: {
    openOverlay:false,
    message:"",
    type:""
  },
  getters: {

  },
  mutations: {
    CHANGE_OVERLAY(state){
      state.openOverlay = !state.openOverlay
      console.log(state.openOverlay)
    },
    SHOW_MSG(state,{message,type}){
       console.log(message,type)
     state.message = message
     state.type = type
     setTimeout(()=>{
       state.message = ""
       state.type = ""
     },3000)
    }
  },
  actions: {
  },
  modules: {
    videos,
    playlists,
    auth
  }
})
