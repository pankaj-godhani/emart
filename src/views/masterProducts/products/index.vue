<template>
  <div class="content">

    <div class="container-fluid mt-4">
      <div>
          <div class="row align-items-center pb-4">
            <div class="col-lg-6 col-7">
              <h3 class="mb-0">Products</h3>
            </div>
            <div class="col-lg-6 col-5 text-right">
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

};
</script>

<style></style>
