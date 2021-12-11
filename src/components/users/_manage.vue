<template>
  <card>
    <div class="container ct-example-row">
      <div class="row mt-1">
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
          <label class="px-3 form-control-label p-1 rounded bg-danger text-white" v-if="userData.isActive===false">Inactive</label>
          <label class="px-3 form-control-label p-1 rounded bg-success text-white" v-if="userData.isActive===true">active</label>
          <base-dropdown
            menu-on-left
            class="nav-item"
            tag="li"
            title-tag="a"
            title-classes="nav-link pr-0"
          >
            <template v-slot:title-container>
              <a href="#" class="nav-link pr-0" @click.prevent>
                <div class="media align-items-center">
                  <div class="media-body ml-2 d-none d-lg-block">
                    <button class="mb-0 rounded-circle border border-light btn-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </a>
            </template>

            <button v-if="userData.isActive===false" type="button" class="dropdown-item" @click="changeStatus">
              Active
            </button>

            <button v-if="userData.isActive===true" type="button" class="dropdown-item" @click="changeStatus">
               Inactive
            </button>

          </base-dropdown>
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
    },

    changeStatus(){
      axios.put(`api/auth/changeActiveStatus/${this.id}`,{
        headers: {
          'Authorization': this.token
        },
      })
      .then(response=>{
        console.log(response);
        this.$router.go();
      })
    }
  }
};

</script>
