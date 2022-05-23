<template>
  <card
    class="no-border-card"
    body-classes="px-0 pb-1 py-3"
    footer-classes="pb-2"
  >
    <div class="text-center mt-4" v-if="loading">
     <div class="spinner-border" role="status"></div>
    </div>
    <div v-else-if="visible" class="pl-0">
<!--      {{usersData.filter((e)=>e.isActive===false)}}-->
      <Table>
        <template #thead>
          <tr>

            <th>Sr. No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="(data, index) in pagedData" :key="data._id">

            <td>{{index +1+ to -pagedData.length}}</td>
            <td>{{ data.firstName }}</td>
            <td>{{ data.lastName }}</td>
            <td>{{ data.email }}</td>
            <td>
              <span :class="data.isActive?'px-3 p-1 rounded bg-success text-white':'px-3 p-1 rounded bg-danger text-white'">
                {{ data.isActive?'Active':'Inactive' }}
              </span>
            </td>
            <td>
              <div class="d-flex">
                <div class="pr-2">
                  <router-link
                    :to="{ name: 'UserEdit', params: { id: data._id } }"
                  >
                    <button
                      type="button"
                      class="btn base-button btn-icon btn-fab btn btn-default btn-sm edit"
                    >
                      <i class="text-white ni ni-ruler-pencil"></i>
                    </button>
                  </router-link>
                </div>
                <div class="pr-2">
                  <router-link
                    :to="{ name: 'UserProfile', params: { id: data._id } }"
                  >
                    <button
                      type="button"
                      class="btn base-button btn-icon btn-fab btn btn-default btn-sm edit"
                    >
                      <i class="fa fa-eye fa-lg" aria-hidden="true"></i>
                    </button>
                  </router-link>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </Table>
    </div>
    <div v-else-if="status!==200||error" class="text-center py-5">
      Data not found
    </div>
    <template v-slot:footer>
      <div
        class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
      >
        <div class="">
          <p class="card-category">
            Showing {{ from +1 }} to {{ to }} of {{ total }} entries
          </p>
        </div>
        <base-pagination
          class="pagination-no-border"
          v-model="pagination.currentPage"
          :per-page="pagination.perPage"
          :total="total"
        >
        </base-pagination>
      </div>
    </template>
  </card>
</template>

<script>
import axios from "axios";

export default {
  props:['userStatus'],
  data(){
    return{
      usersData : [],
      //user_status:this.userStatus,
      loading : false,
      visible : false,
      status : "",
      error : "",
      pagination: {
        perPage: 7,
        currentPage: 1,
        total: 0,
      },
    }
  },

  mounted(){
    this.fetch();
  },
  computed: {
    pagedData() {
      return this.usersData.slice(this.from, this.to);
    },

    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.visible ? this.pagination.perPage * (this.pagination.currentPage - 1) : (-1);
    },
    total() {
      return this.visible ? this.usersData.length : 0;
    },
  },

  methods:{
    goToData(id) {
      this.$router.push({ name: 'Profile', params: { id: id } });
    },
    fetch(){
      this.loading = true;
      axios.get(`api/auth/getAllUser`)
      .then(response=>{
        this.status = response.status;
        let usersData = response.data.userList;
        console.log("this.userStatus====>",this.userStatus)
        if(this.userStatus==="true"){
          console.log("---filter--->",usersData.filter((e)=>e.isActive===true));
          this.usersData=usersData.filter((e)=>e.isActive===true);
        }
        else if(this.userStatus==="false"){
          console.log("---filter--->",usersData.filter((e)=>e.isActive===false));
          this.usersData=usersData.filter((e)=>e.isActive===false);
        }
        else {
          this.usersData=usersData;
        }

        //this.usersData= this.userStatus?usersData.filter((e)=>e.isActive===true):usersData.filter((e)=>e.isActive===false);



        this.loading = false;
        this.visible=true;
      })
      .catch((error)=>{
        this.error = error;
        this.loading = false;
        this.visible=false;
      });
    }
  }
};

</script>

<style scoped>
tr th{
  font-size: 12px !important;
  font-weight: bold;
}
</style>
