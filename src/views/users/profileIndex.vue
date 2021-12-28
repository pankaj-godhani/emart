<template>
  <div class="content">
    <div class="container-fluid mt-4">
      <div>
        <div class="row align-items-center pb-4">
          <div class="col-lg-6 col-7">
            <h3 class="mb-0">Your Profile</h3>
          </div>
          <div class="col-lg-6 col-5 text-right">
            <router-link :to="{ name: 'UserEdit', params: { id: userID } }">
              <base-button type="default">Edit Profile</base-button>
            </router-link>
          </div>
        </div>

        <ProfileList></ProfileList>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileList from "../../components/users/_profileList";

export default {
  data(){
    return{}
  },
  computed:{
    userID(){
      return this.$store.getters['auth/getUserID']
    }
  },
  components: {
    ProfileList,
  },
};
</script>

<style></style>
