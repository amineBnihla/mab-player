import {signInWithPopup,GoogleAuthProvider,EmailAuthProvider, createUserWithEmailAndPassword,reauthenticateWithCredential,signInWithEmailAndPassword,signOut} from "firebase/auth"
import {auth} from "@/firebase/config"
const state = ()=>({
    user:{}
})
const getters={
    get_photo_url :(state) => state.user.photoURL,
    get_info :(state) =>({name:state.user.displayName,phone:state.user.phoneNumber}),
    get_email :(state) =>state.user.email,

}
const mutations={

}
const actions ={
    async sign_in(state,{email,password}){
     try {
      const res = await signInWithEmailAndPassword(auth, email, password)
        if(res.user){
            state.user = res.user
        }
     } catch (error) {
        throw new Error(error)
     }
    },
async sign_up({state},{email,password}){
    try{

        const res = await createUserWithEmailAndPassword(auth,email,password)
        if(res.user){
            state.user = res.user
        }
    }catch(err){
        throw new Error(err)
    }

},
async sign_out(){
    try {
      await signOut(auth)
      
    } catch (error) {
        throw new Error(error)
    }
},
async reAuthenticate(_,password){
    try{
        const credential = EmailAuthProvider.credential(auth.currentUser.email,password)
        await reauthenticateWithCredential(auth.currentUser,credential)
    }catch(err){
        throw new Error(err)
    }
},
async google_auth(){
    const provider = new GoogleAuthProvider();
try {
 await signInWithPopup(auth, provider);    
} catch (error) {
    throw new Error(error)
}
}
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}