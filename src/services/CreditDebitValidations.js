import Validations from "./Validations";

export default class CreditDebitValidations {
  constructor(
    itemQuantity='',
    HSNCode='',
    unitPrice='',
    priceDifference='',
    taxRate='',
    CGST='',
    SGST='',
    IGST='',
    amount=''
  ) {
    this.itemQuantity = itemQuantity,
    this.HSNCode = HSNCode,
    this.unitPrice = unitPrice,
    this.priceDifference = priceDifference,
    this.taxRate = taxRate,
    this.CGST = CGST,
    this.SGST = SGST,
    this.IGST = IGST,
    this.amount = amount
  }

  checkValidations(){
    let errors=[];
    if(!Validations.checkForNumbers(this.itemQuantity)){
      errors['itemQuantity'] = 'Invalid Item Quantity. It should be number.'
    }

    if(!Validations.checkForNumbers(this.HSNCode)){
      errors['HSNCode'] = 'Invalid HSN Code. It should be number.'
    }

    if(!Validations.checkForNumbers(this.unitPrice)){
      errors['unitPrice'] = 'Invalid Unit Price. It should be number.'
    }

    if(!Validations.checkForNumbers(this.priceDifference)){
      errors['priceDifference'] = 'Invalid Price Difference. It should be number.'
    }

    if(!Validations.checkForNumbers(this.taxRate)){
      errors['taxRate'] = 'Invalid Tax rate. It should be number.'
    }

    if(!Validations.checkForNumbers(this.CGST)){
      errors['CGST'] = 'Invalid CGST. It should be number.'
    }

    if(!Validations.checkForNumbers(this.SGST)){
      errors['SGST'] = 'Invalid SGST. It should be number.'
    }

    if(!Validations.checkForNumbers(this.IGST)){
      errors['IGST'] = 'Invalid IGST. It should be number.'
    }

    if(!Validations.checkForNumbers(this.amount)){
      errors['amount'] = 'Invalid amount. It should be number.'
    }
    return errors;
  }

}
