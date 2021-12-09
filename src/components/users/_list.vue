<template>
  <card
    class="no-border-card"
    body-classes="px-0 pb-1 py-3"
    footer-classes="pb-2"
  >
    <div class="pl-0">
      <Table>
        <template #thead>
          <tr>
            <th>Sr No</th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail ID</th>
            <th>Action</th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="(data, index) in usersData" :key="data._id">

            <td>{{ index + 1 }}</td>
            <td>{{data._id}}</td>
            <td>{{ data.firstName }}</td>
            <td>{{ data.lastName }}</td>
            <td>{{ data.email }}</td>
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
      axios.get(`api/auth/getAllUser`,{

        headers: {
          'Authorization': this.token
        },
      })
      .then(response=>{
        this.usersData=response.data.userList;
        console.log(response.data.userList);
      });
    }
  }
};

</script>
