import Validations from "./Validations";

export default class SchemeValidations{
  constructor(
    EANCode='',
    quantity ='',
    freeQuantity ='',
    discount='',
  ) {
    this.EANCode=EANCode;
    this.quantity=quantity;
    this.freeQuantity=freeQuantity;
    this.discount=discount;
  }

  checkValidations(){
    let errors=[];

    if(!Validations.checkForNumbers(this.EANCode)){
      errors['EANCode'] = "Invalid EAN Code. It should be number."
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
