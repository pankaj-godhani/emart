
import { createApp } from "vue";
import store from './state/store';
import App from "./App.vue";
import router from "./router";
import ArgonDashboard from "./plugins/argon-dashboard";
import "element-plus/lib/theme-chalk/index.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
window.axios = require("axios");
import Axios from "axios";
import excel from "vue-excel-export";
import GlobalMixin from "./globalMixin";

const token = store.getters['auth/getToken'];
Axios.defaults.headers.common['Authorization']=token;
Axios.defaults.baseURL = "https://vuecrud-etj2v.ondigitalocean.app/";

//Axios.defaults.baseURL = "http://localhost:9999/";

const options = { containerClassName: "ct-notification" };

const appInstance = createApp(App);
appInstance.use(router);
appInstance.use(store);
appInstance.use(excel);
appInstance.use(Toast, options);
appInstance.use(ArgonDashboard);

appInstance.mixin(GlobalMixin);
appInstance.mount("#app");


