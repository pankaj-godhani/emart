<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <!--          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>-->
          <button
            type="button"
            @click.prevent="cancel"
            class="btn btn-secondary bg-dark text-white"
          >
            Cancel
          </button>
        </div>
        <div class="modal-body">
          {{ confirmText }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { default: false, type: Boolean },
    title: { required: true, type: String },
    confirmText: { required: true, type: String },
    description: { type: String },
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {
    cancel() {
      this.$emit("cancelled");
      this.close();
    },

    confirm() {
      this.$emit("confirmed");
      this.close();
    },

    close() {
      this.$emit("input", false);
    },
  },

  computed: {
    isOpen() {
      return this.value;
    },
  },
};
</script>
