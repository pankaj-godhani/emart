<template>
  <div class="content">
    <div class="container-fluid mt-3">
      <div>
        <div class="row">
          <div class="col-sm">
            <h3 class="mb-2 ">Products</h3>
          </div>
          <div class=" col-sm text-right">
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

              <button type="button" class="dropdown-item" @click="onExportSample">
                Template
              </button>

              <button type="button" class="dropdown-item">
                <export-excel :data="productData"> Download Products in excel </export-excel>
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
        </div>

        <div v-if="visibleCard">
          <DataModal :title="'Upload Excel'" @close="visibleCard=false">
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
                  <label style="font-size: 13px;position: absolute;top: 0px;
                     font-family: 'Roboto', sans-serif;font-weight: 300;">Upload only .xlsx file</label>
                </form>
              </div>
            </template>
            <template v-slot:footer>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="visibleCard=false"
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
        <ProductList></ProductList>
      </div>
    </div>
  </div>
</template>
<script>
import ProductList from "../../../components/masterProducts/products/_list";
import axios from "axios";
import FileSaver from "file-saver";
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  components: {
    ProductList,
  },
  data() {
    return {
      form: {
        productName: "",
        EANCode: "",
        SKUCode: "",
        startDate: "",
        endDate: "",
      },
      visibleCard: false,
      productData: {
        priceApproval:'',
        schemes: ''
      }
    }
  },
  mounted() {
    this.fetchProduct();
  },
  computed:{
    ...mapGetters('auth',{
      userID:'getUserID',
    }),
  },
  methods: {
    handleFileUpload() {
      this.excel = this.$refs.file.files[0];
    },
    fetchProduct() {
      axios.get(`/api/product/get`,).then((response) => {
        this.productData=response.data;
        for (const i in response.data) {
          this.productData[i].priceApproval=response.data[i].priceApproval?'Approved':'Not approved';
          this.productData[i].schemes=response.data[i].schemes.schemaName?response.data[i].schemes.schemaName:'';
        }
      });
    },
    uploadExcel() {
      const formData = new FormData();
      formData.append("userID", this.userID);
      formData.append("file", this.excel);
      axios.post("api/product/excelUpload", formData, {
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
          this.visibleCard=false;
        })
        .catch(() => {
          this.notification("Something went wrong", "error");
        });
      this.$refs.file.value = null;
      this.visibleCard=false;
    },

    onExportSample() {
      axios.get(`api/product/download`,{
        responseType: 'blob',
      })
        .then((response) => {
          FileSaver.saveAs(response.data, 'sampleProductSheet.xlsx');
        })
        .catch(() => {
          this.notification("Something went wrong. Please try later.","error")
        })
    }


  }
};
</script>

<style></style>
