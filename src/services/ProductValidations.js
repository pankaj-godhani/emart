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
      errors['shelfLifeDays'] = "Self Life is required. It should be number."
    }

    if(!Validations.checkRequiredNumber(this.quantity)){
      errors['quantity'] = "Quantity is required. It should be number."
    }
    /*else if(!Validations.checkRequiredField(this.quantity)){
      errors['quantity'] = "Quantity is required."
    }*/
    if(!Validations.checkRequiredNumber(this.item_mrp)){
      errors['item_mrp'] = "Invalid MRP. It should be number."
    }

    if(!Validations.checkRequiredNumber(this.sellingPrice)){
      errors['sellingPrice'] = "Transfer Price is required. It should be number."
    }

    if(!Validations.checkRequiredNumber(this.margin)){
      errors['margin'] = "Invalid margin. It should be number."
    }

    if(!Validations.checkRequiredNumber(this.percentage)){
      errors['percentage'] = "Invalid percentage. It should be number."
    }
    return errors;
  }
}
