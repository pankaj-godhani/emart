import Validations from "./Validations";

export default class SignupValidations{
  constructor(
    email,
    mobileNumber,
    postal_Code= '',
    accountNumber='',
    vendor_name='',
    firstName='',
    lastName='',
    address_Line1='',
    address_Line2='',
    country_id='',
    state='',
    city='',
    vendorType='',
    panNo='',
    GST='',
    panpicture= '',
    gstpicture= '',
    cancelledchequepic='',
    coincorporation='',

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
    this.panNo=panNo;
    this.GST=GST;
    this.panpicture= panpicture,
    this.gstpicture= gstpicture,
    this.cancelledchequepic=cancelledchequepic,
    this.coincorporation=coincorporation
  }

  checkValidations(){
    let errors=[];
    //email validation
    if(!Validations.checkEmail(this.email)){
      errors['email'] = 'Invalid Email, Please enter valid email.'
    }
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

    if(!Validations.checkRequiredField(this.lastName)){
      errors['lastName'] = 'Last name is required.'
    }

    if(!Validations.checkRequiredField(this.address_Line1)){
      errors['address_Line1'] = 'Address line 1 is required.'
    }

    if(!Validations.checkRequiredField(this.address_Line2)){
      errors['address_Line2'] = 'Address line 2 is required.'
    }

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

    if(!Validations.checkRequiredField(this.panNo)){
      errors['panNo'] = 'Pan number is required.'
    }

    if(!Validations.checkRequiredField(this.GST)){
      errors['GST'] = 'GST number is required.'
    }

    if(!Validations.checkRequiredFile(this.panpicture)){
      errors['panpicture'] = 'PAN number document is required.'
    }

    if(!Validations.checkRequiredFile(this.gstpicture)){
      errors['gstpicture'] = 'GST number document is required.'
    }
    if(!Validations.checkRequiredFile(this.gstpicture)){
      errors['gstpicture'] = 'GST number document is required.'
    }

    if(!Validations.checkRequiredFile(this.cancelledchequepic)){
      errors['cancelledchequepic'] = 'Cancelled cheque document is required.'
    }

    if(!Validations.checkRequiredFile(this.coincorporation)){
      errors['coincorporation'] = 'Certificate of incorporation document is required.'
    }
    return errors;
  }
}
