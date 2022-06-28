import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { auth } from '@/firebase/config'
import {onAuthStateChanged} from 'firebase/auth'
import store from "@/store"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
   {
     path:"/login",
     name:'login',
     meta:{
      requiresAuth:false
     },
     component: ()=> import("@/views/LoginView.vue"),
   },
   {
     path:"/sign-up",
     name:'sign-up',
     meta:{
      requiresAuth:false
     },
     component: ()=> import("@/views/SignupView.vue"),
   },
   {
     path:"/admin",
     component: ()=> import("@/views/AdminView.vue"),
      meta:{
     requiresAuth:true
     },
     children:[
       {
         path:"",
         name:'dashboard',
         component: ()=> import(/* webpackChunkName: "admin-dashboard" */"@/views/admin/DashboardView.vue"),
       },
       {
         path:"search",
         component: ()=> import(/* webpackChunkName: "admin-search" */"@/views/admin/SearchView.vue"),
       },
       {
         path:"playlist",
         component: ()=> import(/* webpackChunkName: "admin-playlist" */"@/views/admin/PlaylistView.vue"),
       },
       {
         path:"/:id/videos",
         name:"videos",
         component: ()=> import(/* webpackChunkName: "admin-videos" */"@/views/admin/VideosView.vue"),
       },
        {
         path:"profile",
         name:"profile",
         component: ()=> import(/* webpackChunkName: "admin-profile" */"@/views/admin/ProfileView.vue"),
       },
     ]
   }
]

async function getAuthUser (){
  return new Promise((resolve,reject)=>{
   const removeListener =  onAuthStateChanged(auth,(user)=>{
    removeListener(),
    store.state.auth.user = user;
    resolve(user)
    },reject)
  })
}
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(async (to,from,next)=>{
  if(to.meta.requiresAuth){
   if(await getAuthUser()){
    next()
   }else{
    next('/login')
   }
  }else if(!to.meta.requiresAuth){
    if(await getAuthUser()){

      next('/admin')
    }else{
      next()
    }
  }else{
    next()
  }
})
export default router
