<template>
    <div class="datepicker">

            <div v-if="customPeriod"
                 class="">
                <DateInput :value="start_date" @input="setStartDate" class="form-control"></DateInput>
                <DateInput :value="end_date" @input="setEndDate" class="form-control"></DateInput>
            </div>

    </div>
</template>

<script>
import moment from 'moment';
    export default {
        props: {
            start_date: {default: null},
            end_date: {default: null},
        },

        data() {
            return {
                options: {
                    CUSTOM: 'Custom time period',
                },
                period: 'ALL_TIME',
            }
        },

        mounted() {
            this.period = 'CUSTOM';
            this.selectPeriod(this.period);
        },

        methods: {

            selectPeriod(key) {
                this.period = key;
                this.setDatesFromPeriod();
            },

            setDatesFromPeriod() {
                let start_date = moment(),
                    end_date = moment();

                this.setStartDate(start_date.format('YYYY-MM-DD'));
                this.setEndDate(end_date.format('YYYY-MM-DD'));
                this.$emit('input');
            },

            setStartDate(date) {
                this.$emit('update:start_date', date);

                if (this.period === 'CUSTOM') {
                    this.$emit('input');
                }
            },

            setEndDate(date) {
                this.$emit('update:end_date', date);

                if (this.period === 'CUSTOM') {
                    this.$emit('input');
                }
            }
        },

        computed: {
            periodLabel() {
                return _.get(this.options, this.period);
            },

            customPeriod() {
                return this.period === 'CUSTOM';
            }
        }
    }
</script>


<style scoped>

</style>
