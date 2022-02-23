import Validations from "./Validations";

export default class InvoiceValidations{
  constructor(
    PONumber='',
    invoiceNumber='',
    invoiceValue='',
    CGSTValue='',
    SGSTValue='',
    IGSTValue=''
  ) {
    this.PONumber = PONumber,
    this.invoiceNumber = invoiceNumber,
    this.invoiceValue = invoiceValue,
    this.CGSTValue = CGSTValue,
    this.SGSTValue = SGSTValue,
    this.IGSTValue = IGSTValue
  }

  checkValidations(){
    let errors=[];

    if(!Validations.checkForNumbers(this.PONumber)){
      errors['PONumber'] = 'Invalid PO Number. It should be number.'
    }

    if(!Validations.checkRequiredNumber(this.invoiceNumber)){
      errors['invoiceNumber'] = 'Invoice number is required. It should be number.'
    }

    if(!Validations.checkRequiredNumber(this.invoiceValue)){
      errors['invoiceValue'] = 'Invoice value is required. It should be number.'
    }

    if(!Validations.checkForNumbers(this.CGSTValue)){
      errors['CGSTValue'] = 'Invalid CGST. It should be number.'
    }

    if(!Validations.checkForNumbers(this.SGSTValue)){
      errors['SGSTValue'] = 'Invalid SGST. It should be number.'
    }

    if(!Validations.checkForNumbers(this.IGSTValue)){
      errors['IGSTValue'] = 'Invalid IGST. It should be number.'
    }
    return errors;
  }

}
