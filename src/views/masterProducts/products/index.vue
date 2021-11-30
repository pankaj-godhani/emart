<template>
  <div class="content">
    <div class="container-fluid mt-4">
      <div>
        <div class="row align-items-center pb-4">
          <div class="col-lg-4">
            <h3 class="mb-0">Products</h3>
          </div>
          <div class="col-lg-8 text-right">
            <button type="button" class="btn base-button btn-default" @click="onExportApi">
               Sample Excel
            </button>
            <button type="button" class="btn base-button btn-default">
              <export-excel :data="productData"> Download Excel </export-excel>
            </button>

            <button
              type="button"
              class="btn base-button btn-default"
              @click="visibleCard = true"
              data-toggle="modal"
              data-target="#myModal"
            >
              Excel Upload
            </button>
            <router-link :to="{ name: 'ProductCreate' }">
              <base-button type="default">Add Product</base-button>
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
                    <label class=" "
                           style="font-size: 13px;position: absolute;top: 0px;
                     font-family: 'Roboto', sans-serif;font-weight: 300;">Upload only .xlsx file</label>
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
import sampleData from "./sampleExcel";
import axios from "axios";
import FileSaver from 'file-saver';
export default {
  components: {
    ProductList,
  },
  data() {
    return {
      visibleCard: false,
      productData: [],
      sampleData,
    }
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
          if (this.status == 200) {
            this.notification("File Uploaded Successfully", "success");
            this.$router.go();
          } else if (this.status == 201) {
            this.notification("" + response.data.message, "error");
          }
        })
        .catch(() => {
          this.notification("Something went wrong", "error");
        });
      this.$refs.file.value = null;
    },
    onExportApi() {
      axios.get(`https://vuecrud-etj2v.ondigitalocean.app/api/product/download`,{
        responseType: 'blob',
      })
        .then((response) => {
          FileSaver.saveAs(response.data, 'Export2.xlsx');
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
    }


  }
};
</script>

<style></style>
