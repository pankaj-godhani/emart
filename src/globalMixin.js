import { useToast } from "vue-toastification";
import moment from "moment";

export default {
  data(){
    return{}
  },
  methods:{
    notification(content, type) {
      const toast = useToast();
      toast(content, {
        hideProgressBar: true,
        icon: false,
        type: type,
        closeButton: false,
        position: "top-right",
        timeout: 1700,
      });
    },

    goBack() {
      this.$router.go(-1);
    },

    changeDateFormat(date){
      return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
  }
}
