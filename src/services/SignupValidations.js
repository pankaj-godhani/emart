import Validations from "./Validations";

export default class SignupValidations{
  constructor(
    email,
    mobileNumber,
    postal_Code= '',
    accountNumber='',
    vendor_name='',
    firstName='',
    /*middleName='',*/
    lastName='',
    address_Line1='',
    address_Line2='',
   /* vendor_Code='',*/
    country_id='',
    state='',
    city='',
    vendorType=''

  ) {
    this.email=email;
    this.mobileNumber=mobileNumber;
    this.postal_Code=postal_Code;
    this.accountNumber=accountNumber;
    this.vendor_name=vendor_name;
    this.firstName=firstName;
    this.lastName=lastName;
    this.address_Line1=address_Line1;
    this.address_Line2=address_Line2;
    this.country_id=country_id;
    this.state=state;
    this.city=city;
    this.vendorType=vendorType;
  }

  checkValidations(){
    let errors=[];
    //email validation
    if(!Validations.checkEmail(this.email)){
      errors['email'] = 'Invalid Email, Please enter valid email.'
    }
    //password validation
    /*if(!Validations.checkPassword(this.passWord,6)){
      errors['passWord'] = 'Password should be at least 6 character.'
    }*/
    //mobile number validation
    if(!Validations.checkMobileNumber(this.mobileNumber)){
      errors['mobileNumber'] = 'Invalid Mobile Number, Please enter valid Mobile number.'
    }
    //postal code validation
    if(!Validations.checkPostalNumber(this.postal_Code)){
      errors['postal_Code'] = 'Invalid Postal Code, Please enter valid Postal Code.'
    }

    if(!Validations.checkForNumbers(this.accountNumber)){
      errors['accountNumber'] = 'Invalid Account Number, Please enter valid Account Number.'
    }

    if(!Validations.checkRequiredField(this.vendor_name)){
      errors['vendor_name'] = 'Vendor name is required.'
    }

    if(!Validations.checkRequiredField(this.firstName)){
      errors['firstName'] = 'First name is required.'
    }

    /*if(!Validations.checkRequiredField(this.middleName)){
      errors['middleName'] = 'Middle name is required.'
    }*/

    if(!Validations.checkRequiredField(this.lastName)){
      errors['lastName'] = 'Last name is required.'
    }

    if(!Validations.checkRequiredField(this.address_Line1)){
      errors['address_Line1'] = 'Address line 1 is required.'
    }

    if(!Validations.checkRequiredField(this.address_Line2)){
      errors['address_Line2'] = 'Address line 2 is required.'
    }

   /* if(!Validations.checkRequiredField(this.vendor_Code)){
      errors['vendor_Code'] = 'Vendor Code is required.'
    }*/

    if(!Validations.checkRequiredField(this.country_id)){
      errors['country_id'] = 'Country ID is required.'
    }

    if(!Validations.checkRequiredField(this.state)){
      errors['state'] = 'State is required.'
    }

    if(!Validations.checkRequiredField(this.city)){
      errors['city'] = 'City is required.'
    }

    if(!Validations.checkRequiredField(this.vendorType)){
      errors['vendorType'] = 'Vendor type is required.'
    }
    return errors;
  }
}
