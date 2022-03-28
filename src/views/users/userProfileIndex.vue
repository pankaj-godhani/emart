<template>
  <div class="content">
    <div class="container-fluid mt-4">
      <div>
        <div class="row align-items-center pb-4">
          <div class="col-lg-6 col-7">
            <h3 class="mb-0">User Profile</h3>
          </div>
        </div>
        <UserProfileList></UserProfileList>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileList from "../../components/users/_userProfileList";

export default {
  data(){
    return{
      id:this.$route.params.id
    }
  },
  mounted() {
    console.log(this.$route.params.id,'id');
  },
  computed:{
    userID(){
      return this.$store.getters['auth/getUserID']
    }
  },
  components: {
    UserProfileList,
  },
};
</script>

<style></style>
