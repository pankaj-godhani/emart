<template>
  <div class="content">
    <div class="container-fluid mt-3">
      <div>
        <div>
            <h3 class="mb-2">Schemes</h3>
        </div>
        <div class="float-right">
          <router-link :to="{ name: 'SchemesCreate' }">
            <base-button type="default">Add Scheme</base-button>
          </router-link>
        </div>
        <SchemesList></SchemesList>
      </div>
    </div>
  </div>
</template>

<script>
import SchemesList from "../../../components/masterProducts/schemes/_list";

export default {
  components: {
    SchemesList,
  },
};
</script>

<style></style>
