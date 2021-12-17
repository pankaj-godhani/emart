<template>
  <div className="content">
    <div className="container-fluid mt-4">
      <div>
        <div className="row align-items-center pb-4">
          <div className="col-lg-6 col-7">
            <h3 className="mb-0">User <b> > Add User</b></h3>
          </div>
          <div className="col-lg-6 col-5 text-right"></div>
        </div>
        <ManageUser></ManageUser>
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
};
</script>

<style></style>
