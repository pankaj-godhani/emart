const axios = require("axios");
module.exports={
  data(){
    return{
      UserData: [],
    }
  },
  computed:{
    isAdmin(){
      return this.$store.getters['auth/getIsAdmin'];
    }
  },
  mounted() {
    this.fetchUser();
  },
  methods:{
    fetchUser(){
      if(this.isAdmin===true){
        axios.get(`api/auth/getAllUser`)
          .then(response=>{
            this.UserData=response.data.userList;
            //console.log(this.userData);
          });
      }

    },
  }
}
