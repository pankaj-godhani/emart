<template>

  <div>
    <form @submit="submit">
      <label>Scheme Name</label> <input class="form-control" type="text" v-model="schemaName"/>
      <base-button class="btn-primary" type="submit">Submit</base-button>
    </form>
    <Table>
      <template #thead>
        <tr>
          <th>No</th>
          <th>Scheme Name</th>
          <th>Active</th>

        </tr>

      </template>
      <template #tbody>
        <tr v-for="(data,index) in schemeData" :key="data.id">
          <td>{{index+1}}</td>
          <td>{{ data.schemaName }}</td>
          <td>{{ data.active }}</td>
        </tr>

      </template>
    </Table>

  </div>
</template>
<script>
import axios from "axios";

export default {
  data(){
    return{
      schemaName:'',
      schemeData:[]
    }
  },
  mounted() {
    this.fetchSchemes();
  },
  methods:{
    fetchSchemes(){
      axios.get("http://localhost:9999/api/schema/get")
        .then(response=>{
          this.schemeData=response.data;
          console.log(this.schemeData);
        });
    },
    submit(){
     // const formData = new FormData();
      //formData.append('schemaName',this.schemaName);
      console.log(this.schemaName);
      axios.post(`http://localhost:9999/api/schema/create`,{'schemaName':this.schemaName}
      )
        .then(response => {
          console.log(response);
        })
        .catch(error =>{
          console.log( error);
        });

    }
  }
}
</script>
