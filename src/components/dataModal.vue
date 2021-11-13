<template>
  <!--  <button type="button" class="btn btn-primary float-right" data-toggle="modal" data-target="#add">Add User</button>-->

<!--  <div
    id="add"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="align-content-center">
      <div class="modal-dialog" role="document">
        <div class="modal-content" style="position: absolute">
          <div class="modal-header">

            <span>
              <h5 class="modal-title" >{{ title }}</h5>
            </span>

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <slot name="body"></slot>
&lt;!&ndash;            <form id="formdata">
              <div class="card-body">
                <div class="form-group">
                  <label>Product name</label>
                  <input
                    v-model="edit.name"
                    class="form-control"
                    type="text"
                    placeholder="Product Name"
                    aria-label="default input example"
                  />
                  <span v-text="errors"></span>
                </div>
                <div class="form-group">
                  <label>Product price</label>
                  <input
                    v-model="edit.mrp"
                    class="form-control"
                    type="text"
                    placeholder="Product price"
                    aria-label="default input example"
                  />
                </div>
                <div class="form-group">
                  <label>Selling Quantity</label>
                  <input
                    v-model="edit.selling"
                    class="form-control"
                    type="text"
                    placeholder="Selling Quantity"
                    aria-label="default input example"
                  />
                </div>
                <div class="form-group">
                  <label>Description</label>
                  <textarea
                    v-model="edit.description"
                    class="form-control"
                    type="text"
                    placeholder="Product Description"
                    aria-label="default input example"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label>Product Image </label>
                  <input
                    id="file"
                    ref="file"
                    @change="handleFileUpload"
                    class="form-control"
                    type="file"
                    placeholder="Upload Image"
                    aria-label="default input example"
                  />
                </div>
              </div>
            </form>&ndash;&gt;
          </div>
          <div class="modal-footer">

              <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>-->
  <div class="modal fade" id="add" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <span>
              <h5 class="modal-title" >{{ title }}</h5>
            </span>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
    return {


    };
  },

};
</script>

<style scoped>
.modal-body {
  max-height: calc(100vh - 300px);
  overflow-y: auto;
}
</style>
