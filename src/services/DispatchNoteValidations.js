import Validations from "./Validations";

export default class DispatchNoteValidations{
  constructor(
    PONumber='',
    NumberOfCarton='',
    DriverContact='',
    eWayBillNumber='',
    totalNoOfPackages='',
    netWeightInKgs='',
    grossWeightInKgs='',
  ) {
      this.PONumber = PONumber,
      this.NumberOfCarton = NumberOfCarton,
      this.DriverContact = DriverContact,
      this.eWayBillNumber = eWayBillNumber,
      this.totalNoOfPackages = totalNoOfPackages,
      this.netWeightInKgs = netWeightInKgs,
      this.grossWeightInKgs = grossWeightInKgs
  }

  checkValidations(){
    let errors=[];
    if(!Validations.checkForNumbers(this.PONumber)){
      errors['PONumber']='Invalid PO Number. It should be number.'
    }

    if(!Validations.checkForNumbers(this.NumberOfCarton)){
      errors['NumberOfCarton']='Invalid carton number. It should be number.'
    }

    if(!Validations.checkMobileNumber(this.DriverContact)){
      errors['DriverContact']='Invalid Mobile number. Add valid number.'
    }

    if(!Validations.checkForNumbers(this.eWayBillNumber)){
      errors['eWayBillNumber']='Invalid e-way bill number. It should be number.'
    }

    if(!Validations.checkForNumbers(this.totalNoOfPackages)){
      errors['totalNoOfPackages']='Invalid total number of packages. It should be number.'
    }

    if(!Validations.checkForNumbers(this.netWeightInKgs)){
      errors['netWeightInKgs']='Invalid weight. It should be number.'
    }

    if(!Validations.checkForNumbers(this.grossWeightInKgs)){
      errors['grossWeightInKgs']='Invalid gross weight. It should be number.'
    }
    return errors;
  }
}
