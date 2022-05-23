<template>

</template>

<script>
    import store from '../../state/store';

    export default {
        beforeRouteEnter (to, from, next) {
            store.dispatch('auth/logOut');
            next({name: 'Login'});
        },

        methods: {
          notification(){
            this.notification("You have logged out.","success");
          }
        }
    }
</script>
