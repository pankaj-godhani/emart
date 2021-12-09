<template>
  <card>
    <div class="container ct-example-row">
      <h4 class="text-dark">First Name</h4>
      <div class="row mt-4">
        <div class="col-md-4">
          <h4 class="text-dark">First Name</h4>
          <label class="form-control-label">{{userData.firstName}}</label>
        </div>
        <div class="col-md-4">
          <h4 class="text-dark">Last Name</h4>
          <label class="form-control-label">{{userData.lastName}}</label>
        </div>
        <div class="col-md-4">
          <h4 class="text-dark">E-Mail </h4>
          <label class="form-control-label">{{userData.email}}</label>
        </div>

        <div class="w-100 mt-4"></div>

        <div class="col-md-4">
          <h4 class="text-dark">Status</h4>
          <label class="form-control-label">sdasd</label>
        </div>

      </div>
    </div>
  </card>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";


export default {
  props:['id'],
  data(){
    return{
      userData:[],
    }
  },

  computed: {
    ...mapGetters('auth', {
      token: 'getToken',
    }),
  },

  mounted(){
    this.fetch();
  },

  methods:{
    fetch(){
      axios.get(`api/auth/getAllUser/${this.id}`,{
        headers: {
          'Authorization': this.token
        },
      })
      .then(response=>{
        this.userData=response.data.userList[0];
        console.log(response.data.userList[0]);
      })
    }
  }
};

</script>
