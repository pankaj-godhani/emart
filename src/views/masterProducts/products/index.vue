<template>
  <div class="content">
    <div class="container-fluid mt-4">
      <div>
        <div class="row align-items-center pb-4">
          <div class="col-lg-4">
            <h3 class="mb-0">Products</h3>
          </div>
          <div class="col-lg-8 text-right">
            <base-dropdown
              menu-on-right
              class="nav-item"
              tag="li"
              title-tag="a"
              title-classes="nav-link pr-0"
            >
              <template v-slot:title-container>
                <a href="#" class="nav-link pr-0" @click.prevent>
                  <div class="media align-items-center">
                    <div class="media-body ml-2 d-none d-lg-block">
                      <button class="mb-0 rounded-circle border border-light btn-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                      </svg>
                      </button>
                    </div>
                  </div>
                </a>
              </template>
                <router-link :to="{ name: 'ProductCreate' }" >
                  <button type="button" class="dropdown-item">Add Product</button>
                </router-link>

                <button type="button" class="dropdown-item" @click="onExportApi">
                  Template
                </button>

                <button type="button" class="dropdown-item">
                  <export-excel :data="productData"> Download </export-excel>
                </button>

                <button
                  type="button"
                  class="dropdown-item"
                  @click="visibleCard = true"
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  Upload
                </button>

            </base-dropdown>
          </div>

<!--          <div class="col-lg-8 text-right">
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
          </div>-->
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
import {mapGetters} from "vuex";

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
  computed:{
    ...mapGetters('auth',{
      token:'getToken',
    }),
  },
  methods: {
    handleFileUpload() {
      this.excel = this.$refs.file.files[0];
    },
    fetchProduct() {
      axios.get(`/api/product/get`,{
        headers: {
          'Authorization': this.token
        },
      }).then((response) => {
        this.productData = response.data;
        console.log(response.data[0]);
        this.response= _.map(response.data[0], function square(n) {return n;});
        console.log(this.response);
      });
    },
    uploadExcel() {
      const formData = new FormData();
      formData.append("file", this.excel);
      axios.post("api/product/excelUpload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': this.token,
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
        headers: {
          'Authorization': this.token
        },
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
