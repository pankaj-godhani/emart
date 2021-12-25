import {mapState, mapGetters, mapActions} from 'vuex';

export const authComputed = {
    ...mapState('auth', {
        token: (state) => state.token,
    }),
    ...mapGetters('auth', ['loggedIn','getToken','getUserID']),
};

export const authMethods = mapActions('auth', ['logIn', 'logOut','token', 'register','update']);
