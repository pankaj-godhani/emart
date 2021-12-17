const axios = require("axios");
module.exports={
  data(){
    return{
      UserData: [],
    }
  },
  mounted() {
    this.fetchUser();
  },
  methods:{
    fetchUser(){
      axios.get(`api/auth/getAllUser`)
        .then(response=>{
          this.UserData=response.data.userList;
          console.log(this.userData);
        });
    },
  }
}
