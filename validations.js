const validator = require('validator');
const creditCardType = require('credit-card-type');
const postcode = require('postcode-validator');
Sign-in URL: https://429635507130.signin.aws.amazon.com/console 
User name: priyank.saini@fisglobal.com

module.exports = {};

var validationsPacks = {
    isValidEmail : function(email){
        return validator.isEmail(email);
    },
    isValidCard : function(card){
        return validator.isCreditCard(card)
    },
    isMobilePhone :function (phoneNumber){
        return validator.isMobilePhone(phoneNumber)
    },
    creditCardType : function(card){
        return creditCardType.getTypeInfo()
    },
    isNotNull : function(str){
        if(str == null || str == ''){
            return false;
        } 
        return true;
    },
    isNumber : function(number){
        return validator.isNumeric(number)
    },
    isValidExpiryMonth : function(month){
        if(month < 1 || month > 12 || !this.isNumber(month)) {
            return false;
        }
        return true;
    },
    isValidExpiryYear : function(year){
        if(year < 2019 || !this.isNumber(month)) {
            return false;
        }
        return true;
    },
    isValidPostalCode : function(postalcode, country){
        return postcode.validate(postalcode, country);
    },
    isValidCvv : function(cvv){
        if (cvv.length < 3 || !this.isNumber(month)){
            return false;
        }
    }
    
}

module.exports.validation = validationsPacks;

 
