import {createStore} from "vuex";

import modules from './modules';
import router from "../router";
import axios from "axios";

const store = createStore({
    modules,
    // Enable strict mode in development to get a warning
    // when mutating state outside of a mutation.
    // https://vuex.vuejs.org/guide/strict.html

});
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.log(error.response,'hi')
  if (error.response.status === 500 || error.response.status === 400 ||error.response.status === 401 ) {
    store.dispatch('auth/logOut')
    router.push('/login')
  }
  return Promise.reject(error)
});

export default store;
