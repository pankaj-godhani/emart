<template>

    <input type="date"
           :value="value"
           @input="$emit('input', $event.target.value)"
           class="form-control"
    >


</template>

<script>
    export default {
        props: ['value'],

        data() {
            return {

            }
        },

        mounted() {

        },

        methods: {}
    }
</script>
