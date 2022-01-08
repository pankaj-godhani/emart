<template>

</template>

<script>
    import store from '../../state/store';

    export default {
        beforeRouteEnter (to, from, next) {
            store.dispatch('auth/logOut');

            next({name: 'Login'});
        },

        data() {
            return {

            }
        },

        mounted() {

        },

        methods: {}
    }
</script>
