import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth"
import {auth} from "@/firebase/config"
const state = ()=>({
    user:{}
})
const getters={

}
const mutations={

}
const actions ={
    async sign_in(state,{email,password}){
     try {
      const res = await signInWithEmailAndPassword(auth, email, password)
        if(res.user){
            console.log(res)
            console.log(res.user)
            state.user = res.user
        }
     } catch (error) {
           console.log(error.message)
        throw new Error(error)
     }
    },
async sign_up({state},{email,password}){
    try{

        const res = await createUserWithEmailAndPassword(auth,email,password)
        if(res.user){
            console.log(res)
            console.log(res.user)
            state.user = res.user
        }
    }catch(err){
        console.log(err.message)
        throw new Error(err)
    }

},
async sign_out(){
    try {
      await signOut(auth)
      
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