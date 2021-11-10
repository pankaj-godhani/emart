<template>
  <div class="content">

    <div class="container-fluid mt-4">
      <div>
        <div class="row align-items-center pb-4">
          <div class="col-lg-6 col-7">
            <h3 class="mb-0">Products <b> > Product Details</b></h3>
          </div>
          <div class="col-lg-6 col-5 text-right">

          </div>

        </div>
        <ManageProduct></ManageProduct>
      </div>
    </div>
  </div>
</template>
<script>

import ManageProduct from "../../../components/masterProducts/products/_manage";


export default {
  components: {
    ManageProduct,
  },

};
</script>

<style></style>
