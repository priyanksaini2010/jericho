const $ = require("jquery")
const electron = require("electron")
const ipc = electron.ipcRenderer
const validateBillingEntries = require("validate_billing_info")
var Datastore = require('nedb');


//Minimize App
$("#minimize-action").click(function(){
    ipc.send("minimize-app");
});
//Closing App
$("#close-action").click(function(){
    ipc.send("close-app");
})
//Log-our App
$("#logout-action").click(function(){
    ipc.send("logout");
})

$(".nav-link").click(function(){
    //Getting Current Window and target window
    let currentWindow = $(".active").attr("alt")
    let targetId = $(this).attr("alt")

    //Opening and closing target and current window respectively
    $(".active").removeClass("active");
    $(this).addClass("active")
    $("#"+currentWindow).hide();
    $("#"+targetId).show("slow")

})
var db = {}
db.cards = new Datastore('./cards.db');
db.cards.loadDatabase();
//On Document Ready Showing Saved Profiles
$(document).ready(function(){
    if($(".active").attr("alt") == "dashboard") {
        db.cards.find({}, function (err,cards) {
            if(!err){
                cards.forEach(function (card) {
                    let htmlString = "<li><a id='"+card._id+"' href='#' class='profile-click'>"+card.billing_full_name+ "</a></li>"
                    $("#card_profile").append(htmlString);
                })
            }
        })
    }

})
//On Clicking Profile Showing Saved Profile in card
$(document).on('click','.profile-click',function(){
    let identityVar = $(this).attr("id")

    db.cards.findOne({_id : identityVar}, function (err,profile) {
        if(!err){
            for (var key in profile) {
                $("#"+key).val(profile[key])
                $("#__id").val(identityVar)
            }
        }else {
            console.log(err)
        }
    })
})


$("#save_billing").click(function(){

    //Checking if this is update or insert
    let isUpdate = true;
    if($("#__id").val() != ""){
        isUpdate = false;
    }
    if (!isUpdate) {
        // Capturing Enteries
        let _id = $("#__id").val();
        let cardObject = {
            billig_card_number : $("#billig_card_number").val(),
            billig_mm_yy : $("#billig_card_mm_yy").val(),
            billig_card_cvv : $("#billig_card_cvv").val(),
            billing_full_name : $("#billing_full_name").val(),
            billing_email : $("#billing_email").val(),
            billing_telephone : $("#billing_telephone").val(),
            billing_address : $("#billing_address").val(),
            billing_city : $("#billing_city").val(),
            billing_postal_code : $("#billing_postal_code").val(),
            billing_country : $("#billing_country").val(),
            billing_state : $("#billing_state").val(),

        }
        // Validating Enteries
        let validator = validateBillingEntries.validate(cardObject);
        if (!validator.err) {
            db.cards.update({_id : _id },cardObject,{},function(err,numReplaced){
                console.log(numReplaced)
                if(!err){
                    $("#card_profile").empty()
                    db.cards.find({}, function (err,cards) {
                        if(!err){
                            cards.forEach(function (card) {
                                let htmlString = "<li><a id='"+card._id+"' href='#' class='profile-click'>"+card.billing_full_name+ "</a></li>"
                                $("#card_profile").append(htmlString);
                            })
                        }
                    })
                }
            })
        } else {
            alert(validator.err_message)
        }
       
    } else {
        // Capturing Enteries
        let cardObject = [{
            billig_card_number : $("#billig_card_number").val(),
            billig_mm_yy : $("#billig_card_mm_yy").val(),
            billig_card_cvv : $("#billig_card_cvv").val(),
            billing_full_name : $("#billing_full_name").val(),
            billing_email : $("#billing_email").val(),
            billing_telephone : $("#billing_telephone").val(),
            billing_address : $("#billing_address").val(),
            billing_city : $("#billing_city").val(),
            billing_postal_code : $("#billing_postal_code").val(),
            billing_country : $("#billing_country").val(),
            billing_state : $("#billing_state").val(),

        }]
        // Validating Enteries
        let validator = validateBillingEntries.validate(cardObject);
        if (!validator.err) {
            db.cards.insert(cardObject,function(err,cardAdded){
                if(!err){
                    let htmlString = "<li><a href='#'>"+$("#billing_full_name").val()+ "</a></li>"
                    $("#card_profile").append(htmlString);
                }
            })
        }else {
            alert(validator.err_message)   
        }
    }
})


