<template>
  <div class="content">

    <div class="container-fluid mt-4">
      <div>
          <div class="row align-items-center pb-4">
            <div class="col-lg-6 col-7">
              <h3 class="mb-0">Products</h3>
            </div>
            <div class="col-lg-6 col-5 text-right">
              <base-button outline type="default">Down load Format</base-button>
              <base-button outline type="default">Excel Upload</base-button>
              <router-link :to="{name:'ProductCreate'}">
                <base-button type="default">Product Details</base-button>
              </router-link>

            </div>

          </div>
         <ProductList></ProductList>

      </div>
    </div>
  </div>
</template>
<script>

import ProductList from "../../../components/masterProducts/products/_list";


export default {
  components: {
    ProductList,
  },

  methods:{
    downloadExport() {
      this.axios.get('/v1/some-endpoint', {
        // If you forget this, your download will be corrupt.
        responseType: 'blob'
      }).then((response) => {
        // Let's create a link in the document that we'll
        // programmatically 'click'.
        const link = document.createElement('a');

        // Tell the browser to associate the response data to
        // the URL of the link we created above.
        link.href = window.URL.createObjectURL(
          new Blob([response.data])
        );

        // Tell the browser to download, not render, the file.
        link.setAttribute('download', 'report.xlsx');

        // Place the link in the DOM.
        document.body.appendChild(link);

        // Make the magic happen!
        link.click();
      }); // Please catch me!
    }
  }

};
</script>

<style></style>
