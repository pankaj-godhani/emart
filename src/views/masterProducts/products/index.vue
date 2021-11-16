<template>
  <div class="content">
    <div class="container-fluid mt-4">
      <div>
        <div class="row align-items-center pb-4">
          <div class="col-lg-6 col-7">
            <h3 class="mb-0">Products</h3>
          </div>
          <div class="col-lg-6 text-right">
            <button type="button" class="btn base-button btn-default">
              <export-excel :data="productData"> Download Excel </export-excel>
            </button>
            <button
              type="button"
              class="btn base-button btn-default"
              @click="visibleCard = true"
              data-toggle="modal"
              data-target="#add"
            >
              Excel Upload
            </button>
            <router-link :to="{ name: 'ProductCreate' }">
              <base-button type="default">Product Details</base-button>
            </router-link>
          </div>
          <div v-if="visibleCard">
            <DataModal :title="'Upload Excel'">
              <template v-slot:body>
                <div>
                  <form>
                    <input
                      class="form-control"
                      type="file"
                      ref="file"
                      @change="handleFileUpload"
                      name="file"
                    />
                  </form>
                </div>
              </template>
              <template v-slot:footer>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn base-button btn-default"
                  data-dismiss="modal"
                  @click="uploadExcel"
                >
                  upload
                </button>
              </template>
            </DataModal>
          </div>
        </div>
        <ProductList></ProductList>
      </div>
    </div>
  </div>
</template>
<script>
import ProductList from "../../../components/masterProducts/products/_list";
import { useToast } from "vue-toastification";
import axios from "axios";
export default {
  components: {
    ProductList,
  },
  data() {
    return {
      visibleCard: false,
      productData: [],
    };
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
    handleFileUpload() {
      this.excel = this.$refs.file.files[0];
    },
    fetchProduct() {
      axios.get(`/api/product/get`).then((response) => {
        this.productData = response.data;
      });
    },
    notification(content, type) {
      const toast = useToast();
      toast(content, {
        hideProgressBar: true,
        icon: false,
        type: type,
        closeButton: false,
        position: "top-right",
        timeout: 1500,
      });
    },
    uploadExcel() {
      const formData = new FormData();
      formData.append("file", this.excel);
      axios
        .post("api/product/excelUpload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.status = response.status;
          this.notification("Uploaded Successfully", "success");
        })
        .catch(() => {
          this.notification("EANCode already exist", "error");
        });
      this.$refs.file.value = null;
    },
  },
};
</script>

<style></style>
