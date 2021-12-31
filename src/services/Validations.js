export default class Validations{
  static checkEmail(email){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
      return true;
    }
    return false;
  }

  static checkPassword(passWord,minLength){
    if(passWord.length<minLength){
      return false;
    }
    return true;
  }

  static checkMobileNumber(mobileNumber){
    if(mobileNumber.match(/^\d{10}$/))
    {
      return true;
    }
    return false;
  }
}
