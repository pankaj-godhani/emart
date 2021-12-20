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
          class="position-relative w-25 rounded mt-1 bg-white ">
        <div class="p-2 bg-white rounded-top">
          <input type="text" class="form-control" v-model="search"/>
        </div>
        <ul style="height: 100px; overflow: auto">
          <li v-if="!options.length">
            Loading
          </li>
          <li v-else
              v-for="option in filtered_options"
              :key="getValue(option)"
              @click.prevent="toggleSelect(option)"
          >
            <span
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
    value: {type: Array, default: []},
    options: {type: Array, default: []},
    trackBy: {type: String, default: 'id'},
    label: {type: String, default: 'text'},
    minimumLabels: {type: Number, default: 3},
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
      return _.includes(this.value, this.getValue(option));
    },

    toggleSelect(option) {
      this.isSelected(option)
        ? this.value.splice(this.value.indexOf(this.getValue(option)), 1)
        : this.value.push(this.getValue(option));

      this.$emit('changed', this.value);
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
      return this.options.filter(option =>
          this.getText(option).toLowerCase().includes(this.search.toLowerCase())
      );
    },

    selected_values() {
      if(!this.value.length || !this.options.length) {
        return 'Choose';
      }

      let selected = _.map(
          this.options.filter(option => this.isSelected(option)),
          this.label
      );

      if(selected.length > this.minimumLabels) {
        // this will print one, two, three and 2 more
        return selected.slice(0, this.minimumLabels).join(', ') + ' ' + 'and' + ' ' + (selected.length - this.minimumLabels) + ' ' + 'more';
      }

      return selected.join(', ');
    },
  }
}
</script>
