import { createApp } from "vue";
import store from "./state/store";
import App from "./App.vue";
import router from "./router";
import ArgonDashboard from "./plugins/argon-dashboard";
import "element-plus/lib/theme-chalk/index.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
window.axios = require("axios");
import axios from "axios";
import excel from "vue-excel-export";
import GlobalMixin from "./globalMixin";

const token = store.getters["auth/getToken"];
axios.defaults.headers.common["Authorization"] = token;
//axios.defaults.baseURL = "https://vuecrud-etj2v.ondigitalocean.app/";
//axios.defaults.baseURL = "https://vendorapp.emetro.in/";
axios.defaults.baseURL = "https://oyster-app-s2gc3.ondigitalocean.app/";

//axios.defaults.baseURL = "http://localhost:9999/";

const options = { containerClassName: "ct-notification" };
const appInstance = createApp(App);
appInstance.use(router);
appInstance.use(store);
appInstance.use(excel);
appInstance.use(Toast, options);
appInstance.use(ArgonDashboard);
//appInstance.use(VueConfirmDialog)
//appInstance.component(VueConfirmDialog);
appInstance.mixin(GlobalMixin);
appInstance.mount("#app");
