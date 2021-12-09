<template>
  <div class="content">
    <div class="container-fluid mt-4">
      <div>
        <div class="row align-items-center pb-4">
          <div class="col-lg-6 col-7">
            <h3 class="mb-0">User <b> > Edit</b></h3>
          </div>
          <div class="col-lg-6 col-5 text-right"></div>
        </div>
        <ManageUser :id="id"></ManageUser>
      </div>
    </div>
  </div>
</template>
<script>
import ManageUser from "../../components/users/_manage";

export default {
  components: {
    ManageUser,
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>

<style></style>
