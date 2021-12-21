<template>
  <card
    class="no-border-card"
    body-classes="px-0 pb-1 py-3"
    footer-classes="pb-2"
  > <div class="text-center mt-4" v-if="loading">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
    <div v-else class="pl-0">
      <Table>
        <template #thead>
          <tr>

            <th>Sr No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="(data, index) in usersData" :key="data._id">

            <td>{{ index + 1 }}</td>
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
<!--                <div>
                  <button
                    type="button"
                    class="btn base-button btn-icon btn-fab btn-danger btn-sm remove btn-link"
                    @click.prevent="destroy(data._id)"
                  >
                    <i class="text-white ni ni-fat-remove"></i>
                  </button>
                </div>-->
              </div>
            </td>
          </tr>
        </template>
      </Table>
    </div>
  </card>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";

export default {
  data(){
    return{
      usersData:[],
      loading: false,
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
      this.loading = true;
      axios.get(`api/auth/getAllUser`)
      .then(response=>{
        this.usersData=response.data.userList;
       // let array=Object.values(this.usersData[0]);
        //console.log(array);
      })
      .finally(()=>(this.loading = false));
    }
  }
};

</script>
