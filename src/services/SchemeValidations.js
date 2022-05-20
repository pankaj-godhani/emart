import Validations from "./Validations";


export default class SchemeValidations{
  constructor(
    schemaName='',
    EANCode='',
    quantity ='',
    freeQuantity ='',
    discount='',
  ) {
    this.schemaName=schemaName;
    this.EANCode=EANCode;
    this.quantity=quantity;
    this.freeQuantity=freeQuantity;
    this.discount=discount;
  }


  checkValidations(){
    let errors=[];
    if(!Validations.checkRequiredField(this.schemaName)){
      errors['schemaName'] = "Scheme name is required."
    }
    if(!Validations.checkRequiredField(this.EANCode)){
      errors['EANCode'] = "EANCode is required. It should be number."
    }

    if(!Validations.checkForNumbers(this.quantity)){
      errors['quantity'] = "Invalid quantity. It should be number."
    }

    if(!Validations.checkForNumbers(this.freeQuantity)){
      errors['freeQuantity'] = "Invalid free quantity. It should be number."
    }

    if(!Validations.checkForNumbers(this.discount)){
      errors['discount'] = "Invalid discount. It should be number."
    }
    return errors;
  }
}
