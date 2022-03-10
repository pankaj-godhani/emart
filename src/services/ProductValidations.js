import Validations from "./Validations";

export default class ProductValidations{
  constructor(
    shelfLifeDays='',
    quantity='',
    item_mrp='',
    sellingPrice='',
    margin='',
    percentage=''
  ) {
    this.shelfLifeDays = shelfLifeDays;
    this.quantity = quantity;
    this.item_mrp = item_mrp;
    this.sellingPrice = sellingPrice;
    this.margin = margin;
    this.percentage = percentage;
  }

  checkValidations(){
    let errors=[];

    if(!Validations.checkRequiredNumber(this.shelfLifeDays)){
      errors['shelfLifeDays'] = "Invalid Self Life. It should be number."
    }

    if(!Validations.checkRequiredNumber(this.quantity)){
      errors['quantity'] = "Invalid Quantity. It should be number."
    }

    if(!Validations.checkRequiredNumber(this.item_mrp)){
      errors['item_mrp'] = "Invalid MRP. It should be number."
    }

    if(!Validations.checkRequiredNumber(this.sellingPrice)){
      errors['sellingPrice'] = "Invalid Transfer Price. It should be number."
    }

    if(!Validations.checkRequiredNumber(this.margin)){
      errors['margin'] = "Invalid margin. It should be number."
    }

    if(!Validations.checkRequiredNumber(this.percentage)){
      errors['percentage'] = "Invalid percentage. It should be number."
    }
    return errors;
  }
  checkEmptyValidations(){
    let emptyErrors=[];

    if(!Validations.checkRequiredField(this.shelfLifeDays)){
      emptyErrors['shelfLifeDays'] = "Self Life is required."
    }

    if(!Validations.checkRequiredField(this.quantity)){
      emptyErrors['quantity'] = "Quantity is required."
    }

    if(!Validations.checkRequiredField(this.item_mrp)){
      emptyErrors['item_mrp'] = "MRP is required."
    }

    if(!Validations.checkRequiredField(this.sellingPrice)){
      emptyErrors['sellingPrice'] = "Transfer Price is required."
    }

    if(!Validations.checkRequiredField(this.margin)){
      emptyErrors['margin'] = "margin is required."
    }

    if(!Validations.checkRequiredField(this.percentage)){
      emptyErrors['percentage'] = "Percentage is required."
    }

    return emptyErrors;
  }
}
