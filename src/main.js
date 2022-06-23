import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import GAuth from 'vue3-google-oauth2'
import VueApexCharts from "vue3-apexcharts";
const app = createApp(App)
console.log(process.env.VUE_APP_CLIENT_ID)
app.use(VueApexCharts);
const gAuthOptions = { clientId: "584052384881-60lmslip4sf11t1pfgltts2bcf2lu3fc.apps.googleusercontent.com", scope: 'email', prompt: 'consent',fetch_basic_profile: false }
app.use(GAuth, gAuthOptions)
app.use(store).use(router).mount('#app')
