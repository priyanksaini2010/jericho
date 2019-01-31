const validator = require("validations")
const validatioMessages = require("validation_messages")
module.exports = {};

var validateBillingEntries = {
    validate : function(inputObject){
        var returnObject = {
            err : false,
            key : "",
            err_message : ""
        };
        for(property in inputObject){
            switch(property){
                case "billig_card_number":
                        if(!validator.isValidCard(inputObject[property])){
                            returnObject.err = true;
                            returnObject.err_message = validatioMessages.inValidCard;
                            returnObject.key = property;
                            return returnObject;
                        }
                    break;
                case "billig_mm":
                        if(!validator.isValidExpiryMonth(inputObject[property])){
                            returnObject.err = true;
                            returnObject.err_message = validatioMessages.inValidExpiryMonth;
                            returnObject.key = property;
                            return returnObject;
                        }
                    break;
                case "billig_yy":
                        if(!validator.isValidExpiryYear(inputObject[property])){
                            returnObject.err = true;
                            returnObject.err_message = validatioMessages.inValidExpiryYear;
                            returnObject.key = property;
                            return returnObject;
                        }
                    break;
                case "billig_card_cvv":
                        if(!validator.isValidCvv(inputObject[property])){
                            returnObject.err = true;
                            returnObject.err_message = validatioMessages.inValidCvv;
                            returnObject.key = property;
                            return returnObject;
                        }
                    break;
                case "billing_full_name":
                        if(!validator.isNotNull(inputObject[property])){
                            returnObject.err = true;
                            returnObject.err_message = validatioMessages.inValidFullName;
                            returnObject.key = property;
                            return returnObject;
                        }
                    break;
                case "billing_email":
                        if(!validator.isValidEmail(inputObject[property])){
                            returnObject.err = true;
                            returnObject.err_message = validatioMessages.inValidEmail;
                            returnObject.key = property;
                            return returnObject;
                        }
                    break;
                case "billing_telephone":
                        if(!validator.isMobilePhone(inputObject[property])){
                            returnObject.err = true;
                            returnObject.err_message = validatioMessages.inValidMobilePhone;
                            returnObject.key = property;
                            return returnObject;
                        }
                    break;
                case "billing_city":
                        if(!validator.isNotNull(inputObject[property])){
                            returnObject.err = true;
                            returnObject.err_message = validatioMessages.inValidCity;
                            returnObject.key = property;
                            return returnObject;
                        }
                    break;
                case "billing_postal_code":
                        if(!validator.isValidPostalCode(inputObject[property],inputObject['billing_country'])){
                            returnObject.err = true;
                            returnObject.err_message = validatioMessages.inValidPostalCode;
                            returnObject.key = property;
                            return returnObject;
                        }
                    break;
                case "billing_country":
                        if(!validator.isNotNull(inputObject[property])){
                            returnObject.err = true;
                            returnObject.err_message = validatioMessages.inValidCountry;
                            returnObject.key = property;
                            return returnObject;
                        }
                    break;
                case "billing_state":
                    if(!validator.isNotNull(inputObject[property])){
                            returnObject.err = true;
                            returnObject.err_message = validatioMessages.inValidState;
                            returnObject.key = property;
                            return returnObject;
                        }
                    break;


            }
        }
    }
}

module.export.validateBilling = validateBillingEntries

