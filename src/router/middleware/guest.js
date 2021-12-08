import store from '../../state/store';

export default function guest({to, from, next}) {
    // If user is logged in, redirect to home else to intended route.
    store.getters['auth/loggedIn']
        ? next({name: 'Dashboard'})
        : next();
}
