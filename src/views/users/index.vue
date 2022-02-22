<template>
  <div class="content">
    <div class="container-fluid mt-3">
      <div>
        <div class="row align-items-center pb-3">
          <div class="d-flex col-lg-6 col-7">
            <h3 class="mt-2 pr-1">Users  </h3>

            <button class="btn" v-if="system_vendor_ids.includes(null)||system_vendor_ids.includes('')" @click.prevent="syncAll">
              <i class="fas fa-sync"></i>
            </button>
          </div>
          <div class="col-lg-6 col-5 text-right">
            <router-link :to="{ name: 'UserCreate' }">
              <base-button type="default">Add User</base-button>
            </router-link>
          </div>
        </div>

        <UsersList></UsersList>
      </div>
    </div>
  </div>
</template>

<script>
import UsersList from "../../components/users/_list";
import axios from "axios";

export default {
  components: {
    UsersList,
  },
  data(){
    return{
      userData:[],
      system_vendor_ids:[],
    }
  },
  mounted() {
    this.fetch();
  },
  methods:{
    fetch(){
      axios.get(`api/auth/user`)
      .then(response=>{
        this.userData=response.data;
        var system_vendor_ids=[];
        this.userData.forEach(function (user) {
         system_vendor_ids.push(user.system_Vendor_id);

        })
        this.system_vendor_ids=system_vendor_ids
        console.log(this.system_vendor_ids.includes(null));

      })
    },
    syncAll(){
      axios.get(`api/auth/syncCall`)
      .then(response=>{
        console.log(response);
      })
    }

  }
};
</script>

<style></style>
