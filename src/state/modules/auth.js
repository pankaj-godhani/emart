import axios from "axios";

export const state = {
  token: getState('auth.token'),
  userID:getState('auth.userID'),
  user:getState('auth.user'),
  isAdmin:getState('auth.isAdmin'),
};

export const mutations = {
  SET_TOKEN(state, payLoad) {
    state.token = payLoad.token;
    state.userID = payLoad.userID;
    state.user = payLoad.user;
    saveState('auth.token', payLoad.token);
    saveState('auth.userID', payLoad.userID);
    saveState('auth.user', payLoad.user);
    saveState('auth.isAdmin', payLoad.isAdmin);

    /*if (user) {
      window.moment.locale(user.locale ? user.locale : 'de');
    }*/
  },
};

export const getters = {
    loggedIn(state) {
        return !!state.token;
    },
    getToken(state){
      return state.token;
    },
    getUserID(state){
      return state.userID;
    },
    getUser(state){
      return state.user
    },
  getIsAdmin(state){
    return state.isAdmin
  }
};

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    // TODO
    init({state, dispatch}) {
        dispatch('auth/validate');
    },

    // Logs in the current user.
    logIn({commit, dispatch, getters}, form = {}) {
        if (getters.loggedIn) {
            return dispatch('validate');
        }
        return axios.post('api/auth/login', form)
            .then(response => {
              console.log(response,'inside logIn');
                commit('SET_TOKEN', {
                  token:response.data.token,
                  userID:response.data.detail._id,
                  user:response.data.detail,
                  isAdmin:response.data.detail.isAdmin,
                });
                return response.data.token;
            })
            .catch((error)=>{
                  console.log(error,'inside logIn error')
                });
    },

    // Logs out the current user.
    logOut({commit}) {
        return commit('SET_TOKEN',{token:null,userID:null,user:null});
    },

    register({commit, dispatch, getters}, form = {}) {
        if (getters.loggedIn) {
            return dispatch('validate');
        }
        return axios.post('api/auth/create', form)
            .then(response => {
              //commit('SET_TOKEN', {token:response.data.token,userID:response.data.detail._id,user:response.data.detail});
              return response.data;
            });

    },

    // Validates the current user's token and refreshes it  with new data from the API.
    validate({commit, state,getters},form={}) {
        if (!state.token) {
            return Promise.resolve(null);
        }

        return getters.getToken;
    },
};

function getState(key) {
    return JSON.parse(localStorage.getItem(key));
}

function saveState(key, state) {
   localStorage.setItem(key, JSON.stringify(state));
}
