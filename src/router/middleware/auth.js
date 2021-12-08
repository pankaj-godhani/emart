import store from '../../state/store';

export default function auth({to, from, next}) {
    // If auth is required and the user is logged in...
    if (store.getters['auth/loggedIn']) {
        // Validate the local user token...
        return store.dispatch('auth/validate').then(token => {
            // Then continue if the token still represents a valid user, otherwise redirect to login.
            token ? next() : redirectToLogin();
        })
    }

    // If auth is required and the user is NOT currently logged in, redirect to login.
    redirectToLogin();

    function redirectToLogin() {
        // Pass the original route to the login component
        next({name: 'Login', query: {redirectFrom: to.fullPath}});
    }
}
