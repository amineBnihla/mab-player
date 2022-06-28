import {updateProfile, updateEmail, updatePassword} from "firebase/auth"
import {auth} from "@/firebase/config"
import {fileUpload} from "@/helpers/fileUpload"
const state = ()=>({
    user:{}
})
const getters={

}
const mutations={

}
const actions ={
    async change_image(_,{image,oldImg}){
     try {
        console.log(image,oldImg)
        const imageURL = await fileUpload('Profile',image,oldImg)
        console.log(imageURL)
        console.log("hello") 
      await updateProfile(auth.currentUser,{
        photoURL: imageURL
      })
     } catch (error) {
           console.log(error.message)
        throw new Error(error)
     }
    },
async update_info(_,{name,email}){
   try {
      await updateEmail(auth.currentUser,email)
      await updateProfile(auth.currentUser,{
        displayName: name,
      })
     } catch (error) {
           console.log(error.message)
        throw new Error(error)
     }
},
async update_password(_,{password}){
 try {
   console.log(password)
      await updatePassword(auth.currentUser,password)
     } catch (error) {
           console.log(error.message)
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