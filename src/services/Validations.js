
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
   //if(mobileNumber.match(/^\d{10}$/))
   if(String(mobileNumber).match(/^[1-9][0-9]{9}$/))
    {
      //return console.log('true');
      return true;
    }
    return false;
  }

  static checkPostalNumber(postal_Code){
    if(String(postal_Code).match(/^[1-9][0-9]{5}$/))
    {
      return true;
    }
    return false;
  }

  static checkAccountNumber(accountNumber){
    if(String(accountNumber).match(/^[0-9]+$/))
    {
      return true;
    }
    else if(accountNumber===''||accountNumber===null){
      return false;
    }
  }

  static checkRequiredField(name){
    if(name!==''){
      return true;
    }
    return false;
  }

  static checkRequiredNumber(name){

    if(String(name).match(/^(?!0\d)\d*(\.\d+)?$/)){
      return true;
    }
      return false;

  }

  static checkForNumbers(name){
    if(String(name).match(/^(?!0\d)\d*(\.\d+)?$/)||String(name).length === 0||name===null)
    {
      return true;
    }
    return false;


  }
}
