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
        <ManageProfile :id="id"></ManageProfile>
      </div>
    </div>
  </div>
</template>
<script>
import ManageProfile from "../../components/users/_manageProfile";

export default {
  components: {
    ManageProfile,
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>

<style></style>
