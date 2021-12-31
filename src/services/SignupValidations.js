import Validations from "./Validations";

export default class SignupValidations{
  constructor(email,mobileNumber,passWord) {
    this.email=email;
    this.mobileNumber=mobileNumber;
    this.passWord=passWord;
  }

  checkValidations(){
    let errors=[];
    //email validation
    if(!Validations.checkEmail(this.email)){
      errors['email'] = 'Invalid Email, Please enter valid email.'
    }
    //password validation
    if(!Validations.checkPassword(this.passWord,6)){
      errors['passWord'] = 'Password should be at least 6 character.'
    }
    //mobile number validation
    if(!Validations.checkMobileNumber(this.mobileNumber)){
      errors['mobileNumber'] = 'Invalid Mobile Number, Please enter valid Mobile number.'
    }

    return errors;
  }
}
