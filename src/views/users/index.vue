<template>
  <div class="content">
    <div class="container-fluid mt-4">
      <div>
        <div class="row align-items-center pb-4">
          <div class="col-lg-6 col-7">
            <h3 class="mb-0">Users</h3>
          </div>
<!--          <div class="col-lg-6 col-5 text-right">
            <router-link :to="{ name: 'SchemesCreate' }">
              <base-button type="default">Add Scheme</base-button>
            </router-link>
          </div>-->
        </div>
        <UsersList></UsersList>
      </div>
    </div>
  </div>
</template>

<script>
import UsersList from "../../components/users/_list";

export default {
  components: {
    UsersList,
  },
};
</script>

<style></style>
