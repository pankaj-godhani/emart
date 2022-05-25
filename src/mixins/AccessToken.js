const axios = require("axios");
const store = require("../state/store");

module.exports = {
  data() {
    return {
      //userID:store.getters["auth/getUserID"],
      AccessToken: "",
    }
  },
  computed:{
    userID(){
      return this.$store.getters["auth/getUserID"];
    }
  },
  mounted() {
    console.log(this.AccessToken);
    this.fetchAccessToken();
  },
  methods:{
    async fetchAccessToken(){
      if (this.userID !== null) {
        let res=await axios
          .get(
            `https://oyster-app-s2gc3.ondigitalocean.app/api/auth/user/${this.userID}`
          );
        return res.data[0].accessToken;
      }
    },
  }
}
