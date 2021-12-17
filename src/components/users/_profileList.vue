<template>
  <card
    class="no-border-card"
    body-classes="px-0 pb-1 py-3"
    footer-classes="pb-2"
  >
    <div>
      <div class="text-center mb-4">

        <div v-if="user.userImg">
          <img :src="url+user.userImg" class="rounded" style="height: 125px; width: 125px" alt="100x100">
        </div>
        <div v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="125" height="125" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
        </div>

      </div>
<!--      <div class="form-row justify-content-center">
        <div class="form-group col-md-5">
          <h3>Profile Image</h3>
          <img  class="" src="user" alt="">
          <img  class="rounded" style="height: 125px; width: 125px" alt="100x100">
        </div>
      </div>-->
      <div class="row px-6">
        <div class="col">
          <h4 class="text-dark">First Name</h4>
          <label class="form-control-label">{{ user.firstName }}</label>
        </div>
        <div class="col">
          <h4 class="text-dark">Last Name</h4>
          <label class="form-control-label">{{ user.lastName }}</label>
        </div>
        <div class="col">
          <h4 class="text-dark">Email</h4>
          <label class="form-control-label">{{ user.email }}</label>
        </div>
      </div>
      <div class="row px-6 mt-4">
        <div class="col-4">
          <h4 class="text-dark">Authority</h4>
          <label class="form-control-label">{{ user.isAdmin?'Admin':'User' }}</label>
        </div>
        <div class="col-4">
          <h4 class="text-dark">Status</h4>
          <label :class="user.isActive?'px-3 form-control-label p-1 rounded bg-success text-white':'px-3 form-control-label p-1 rounded bg-danger text-white'">
            {{ user.isActive?'Active':'InActive' }}
          </label>
        </div>
      </div>

    </div>
  </card>
</template>

<script>

export default {
  data(){
    return{
      url:"https://vuecrud-etj2v.ondigitalocean.app",
    }
  },
  computed:{
    user(){
      return this.$store.getters['auth/getUser'];
    }
  },
  mounted() {


  }
}
</script>
