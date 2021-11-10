module.exports = {
    computed: {
        auth_user() {
            return this.$store.state.auth.user;
        }
    },

    methods: {
        hasRole(name) {
            return _.includes(this.user.roles, name, false);
        },

        $can(name) {
            return _.includes(this.user.permissions, name, false);
        },

        back() {
            this.$router.go(-1);
        }
    }
};
