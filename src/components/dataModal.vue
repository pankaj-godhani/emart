<template>
  <div
    class="modal fade"
    id="add"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <span>
            <h5 class="modal-title">{{ title }}</h5>
          </span>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dataModal",
  props: ["title"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.modal-body {
  max-height: calc(100vh - 300px);
  overflow-y: auto;
}
</style>
