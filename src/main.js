/*!

=========================================================
* Vue Argon Dashboard PRO - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
import VueBarcode from '@chenfengyuan/vue-barcode';
//import { BarcodeGeneratorPlugin } from '@syncfusion/ej2-vue-barcode-generator';


Axios.defaults.baseURL = "https://vuecrud-etj2v.ondigitalocean.app/";
//Axios.defaults.baseURL = "http://localhost:9999/";

const options = { containerClassName: "ct-notification" };

const appInstance = createApp(App);
appInstance.use(router);
appInstance.use(store);
appInstance.use(excel);
appInstance.use(Toast, options);
appInstance.use(ArgonDashboard);
//appInstance.use(BarcodeGeneratorPlugin);
appInstance.mixin(GlobalMixin);
appInstance.component(VueBarcode.name, VueBarcode);
appInstance.mount("#app");


