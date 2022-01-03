<template>
  <div class="position-relative">
    <span class="d-inline-block w-25 rounded shadow-sm bg-white">
      <button @click.prevent="isOpen = !isOpen"
              type="button"
              class="position-relative btn-block rounded border bg-white pl-3 pr-10 py-2 text-left ">
        <span class="">
          {{ selected_values }}
        </span>
        <span class="float-right">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-expand" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"/>
</svg>
        </span>
      </button>
    </span>

    <transition
        leave-active-class="transition ease-in duration-100"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div v-show="isOpen"
           class="position-absolute w-25 rounded mt-1 bg-white shadow-lg" style="z-index: 9999">
        <div class="p-2 bg-white rounded-top">
          <input type="text" class="form-control" v-model="search"/>
        </div>
        <ul style="height: 100px; overflow: auto"
            >
          <li v-if="!options.length"

              class="cursor-default select-none relative py-2 pl-8 pr-4 text-center text-gray-500"
          >
            <i class="fad fa-spinner-third fa-spin"></i> Loading
          </li>
          <li v-else
              v-for="option in filtered_options"
              :key="getValue(option)"
              @click.prevent="toggleSelect(option)"
              class="position-relative py-2 pl-4 pr-4"
              :class="isSelected(option) ? 'text-dark' : ''"
          >
            <span class="block truncate"
                  :class="isSelected(option) ? 'font-weight-bold' : 'font-weight-light'"
            >
              {{ getText(option) }}
            </span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    value: {type: [String, Number]},
    options: {type: Array, default: []},
    trackBy: {type: String, default: 'id'},
    label: {type: String, default: 'text'},
  },

  data() {
    return {
      isOpen: false,
      search: '',
    }
  },

  mounted() {

  },

  methods: {
    isSelected(option) {
      return this.value === this.getValue(option);
    },

    closeSelect(){
      this.isOpen=false;
    },

    toggleSelect(option) {
      this.$emit('changed', this.getValue(option));

      this.$emit('input', this.getValue(option));

      this.isOpen = false;
    },

    getValue(option) {
      return _.get(option, this.trackBy, null);
    },

    getText(option) {
      return _.get(option, this.label, null);
    }
  },

  computed: {
    filtered_options() {
      if (this.options.length) {
        return this.options.filter(option =>
            this.getText(option).toLowerCase().includes(this.search.toLowerCase())
        );
      }

      return [];
    },

    selected_values() {
      if (!this.value || !this.options.length) {
        return '--Choose--';
      }

      return _.get(_.find(this.options, [this.trackBy, this.value]), this.label);
    },
  }
}
</script>
