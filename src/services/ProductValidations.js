import Validations from "./Validations";

export default class ProductValidations{
  constructor(
    shelfLifeDays='',
    quantity='',
    MRP='',
    sellingPrice='',
    margin='',
    percentage=''
  ) {
    this.shelfLifeDays = shelfLifeDays;
    this.quantity = quantity;
    this.MRP = MRP;
    this.sellingPrice = sellingPrice;
    this.margin = margin;
    this.percentage = percentage;
  }

  checkValidations(){
    let errors=[];

    if(!Validations.checkForNumbers(this.shelfLifeDays)){
      errors['shelfLifeDays'] = "Invalid Self Life. It should be number."
    }

    if(!Validations.checkForNumbers(this.quantity)){
      errors['quantity'] = "Invalid quantity. It should be number."
    }

    if(!Validations.checkForNumbers(this.MRP)){
      errors['MRP'] = "Invalid MRP. It should be number."
    }

    if(!Validations.checkForNumbers(this.sellingPrice)){
      errors['sellingPrice'] = "Invalid Transfer Price. It should be number."
    }

    if(!Validations.checkForNumbers(this.margin)){
      errors['margin'] = "Invalid margin. It should be number."
    }

    if(!Validations.checkForNumbers(this.percentage)){
      errors['percentage'] = "Invalid percentage. It should be number."
    }
    return errors;
  }
}
