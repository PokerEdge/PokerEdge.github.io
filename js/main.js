//Give focus to input#name text input on page load
$('input#name').focus();

//Hide Color part of T-shirt Info area until 'Design' drop down is selected
$('#colors-js-puns').hide();

//Add and hide a span element that will hold the text for the total cost the user will pay upon checking events and registering
$('.activities').append('<span id="totalCost"></span>');
$('#totalCost').hide();

//Error messages and styling edits to be dynamically inserted
$('#nameLabel').append('<span id="nameError">' + ' (please provide your name)' + '</span>').css({'color': '#9f3b53', 'font-weight':'500'});
$('#emailLabel').append('<span id="emailError">' + ' (please provide a valid email address)' + '</span>').css({'color': '#9f3b53', 'font-weight':'500'});

$('.shirt legend').append('<br><span id="shirtError">' + ' Don\'t forget to pick a T-shirt' + '</span>');
$('#shirtError').css({'color': '#9f3b53', 'font-weight':'500', 'font-size':'16px'}); //May be small error having font size in pixels and not in ems like in original css

$('.activities legend').append('<br><span id="activityError">' + ' Please select an Activity' + '</span>');
$('#activityError').css({'color': '#9f3b53', 'font-weight':'500', 'font-size':'16px'});

// //Add span to show if payment method selected is "select_method" on submit
$('.paymentChoice legend').append('<br><span id="paymentError">' + ' Please select a payment option' + '</span>');
$('#paymentError').css({'color': '#9f3b53', 'font-weight':'500', 'font-size':'16px'});


$('#ccTitle').css({'color': '#9f3b53', 'font-weight':'500'});
$('#zipTitle').css({'color': '#9f3b53', 'font-weight':'500'});
$('#cvvTitle').css({'color': '#9f3b53', 'font-weight':'500'});


//Hide error messages and stylings on page load
  //Hide "please provide your name" error massesage and reset message style
$('#nameError').hide();
$('#nameLabel').css({'color': '#000', 'font-weight':'normal'});

  //Hide "please provide a valid email address" error message and reset message style
$('#emailError').hide();
$('#emailLabel').css({'color': '#000', 'font-weight':'normal'});

  //Hide 'Don\'t forget to pick a T-shirt' T-shirt choice error message
$('.shirt span').hide();

  //Hide 'Please select an Activity' error message
$('#activityError').hide();

  //Hide 'Please select a payment option' error message
$('#paymentError').hide();

  //Hide (reset) credit card error styles
$('#ccTitle').css({'color': '#000', 'font-weight':'normal'});
$('#zipTitle').css({'color': '#000', 'font-weight':'normal'});
$('#cvvTitle').css({'color': '#000', 'font-weight':'normal'});


//Initially hide the text input that should only show if user selects "Other" from the "Job Role" dropdown menu
$('#other-title').hide();

//Hide all payment option information on page load that is to be displayed after user chooses an option from the Payment Info dropdown menu
$('div#credit-card').show();
$('div#paypal-option').hide();
$('div#bitcoin-option').hide();


//Apply handler to dropdown menu to call checkJobRoleValue() when the values change
$('select#title').change(function validateJobRoleValue(e){

  checkJobRoleValue();
});

//Apply handler to T-shirt design menu to call checkDesignValue() when the values change
$('select#design').change(function validateDesignValue(e){

  checkDesignValue();
});

//Apply handler to all checkboxes to call checkCheckBox() when the values change
$('input:checkbox').change(function validateCheckBoxValue(e){

  checkCheckBox();
});

//Apply handler to payment dropdown to call checkPaymentOption() when the values change
$('select#payment').change(function validatePaymentOption(e){

  checkPaymentOption();
});

//Apply submit handler on submit button to fire function on submit to prevent invalid data form submissions
$('button[type="submit"]').click(function validateForm(e){
    
  setErrorStyles();
  //Validate name form on submit, adding error styling and preventing submit if invalid
  if (!checkNameValue()){ e.preventDefault(); }

  //Validate email form on submit, adding error styling and preventing submit if invalid
  if (!checkEmailValue()){ e.preventDefault(); };

  //Validate t-shirt design drop down on submit, adding error styling and preventing submit if invalid
  if (!checkDesignValue()) { 

    //Check that a t-shirt color has been chosen else display below error styles and message
    if ($('select#color').val() === 'select-theme'){

      $('#shirtError').show().css({'color': '#9f3b53', 'font-weight':'500', 'font-size':'16px'});
      e.preventDefault();

    } 
  }

  if (!checkCheckBox()){ 

    //Check if an activity is checked, and if not, display error message and style and prevent submission
    if (!$("input:checkbox:checked").length){
    
      $('#activityError').show();
      e.preventDefault();

    } 
  }

  //Check that Credit Card is selected payment option
  if($('select#payment').val() === 'credit card'){
    
    //Validate credit card number on button submit, adding error styling and preventing submit if invalid
    if (!checkCreditCardNumber()){ e.preventDefault(); }

    //Validate zip code on button submit, adding error styling and preventing submit if invalid
    if (!checkZipCode()){ e.preventDefault(); }

    //Validate CVV on button submit, adding error styling and preventing submit if invalid
    if (!checkCVV()){ e.preventDefault(); }
  }
    
  //Check that PayPal is selected payment option
  if($('select#payment').val() === 'paypal'){
      
    //Validate PayPal
      //Submit and send user to PayPal href

  }
    
  //Check that Bitcoin is selected payment option
  if($('select#payment').val() === 'bitcoin'){
      
    //Validate Bitcoin
      //Submit and send user to Bitcoin href

  }
});


//Function checks for a valid name entry by the user, then shows or hides a text field based on the validation
function checkNameValue(){

  //Check name value logic is valid or prevent default
  var nameInput = $('input#name');   
  if(nameInput.val() === ""){
    
    $('#nameLabel').css({'color': '#9f3b53', 'font-weight':'500'});
    $('#nameError').show().css({'color': '#9f3b53', 'font-weight':'500'});
    return false;

  } else {

    return true;

  }
}

//Function checks for a valid email entry by the user, then shows or hides a text field based on the validation
function checkEmailValue(){

  //Hide "please provide a valid email address" error message and reset message style
  $('#emailError').hide();
  $('#emailLabel').css({'color': '#000', 'font-weight':'normal'});

  //Check email value logic is valid
  var email_address = $('input#mail');
  var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

  //Check that email address is valid and display error message and styling if not valid
  if(!email_regex.test(email_address.val())){ 
        
    $('#emailLabel').css({'color': '#9f3b53', 'font-weight':'500'});
    $('#emailError').show().css({'color': '#9f3b53', 'font-weight':'500'});
    return false;

  } else {

     return true;

  }
}


//Function checks for the selected 'Job Role' value, if one is selected, then shows or hides a text field based on the selected value
function checkJobRoleValue(){

  if($('select#title').val() === 'other'){

    $('#other-title').show();

  } else{

    $('#other-title').hide();

  }
}

//Function causes values of the 'Color' drop down menu correspond to the selected labeled 'Design' drop down menu selection
  //Color drop down menu is hidden until an option is selected from 'Design' menu
function checkDesignValue(){

  //Shows color selection label and drop down menu if a design drop down element is selected
  if($('select#design').val() === 'select-design'){
    
    $("#color").val("select-theme");
    $('#colors-js-puns').hide();
    $('select#color').children().hide();

  } else {

    $('#colors-js-puns').show();
    $('select#color').children().show();
  }
  
  if($('select#design').val() === 'js puns'){

    //If design value is "js puns", color menu should display options "Cornflower Blue", "Dark Slate Grey" and "Gold" (top 3 elements in list)
    $("#color").val("cornflowerblue");

    $('select#color').children().show();
    $('select#color').children(":nth-child(n+5)").hide();
    $('#select-theme').hide();

  } else if ($('select#design').val() === 'heart js') {

    //Else if design value is "heart js", color menu should display options "Tomato", "Steel Blue" and "Dim Grey" (bottom 3 elements in list)
    $("#color").val("tomato");

    $('select#color').children().show();
    $('select#color').children(':nth-child(-n+4)').hide();
    $('#select-theme').hide();

  } else {

      //Else if design value is not one of the choices, hide options except "<-- Please select T-shirt theme"
      $('select#color').children(':nth-child(n+1)').hide();

  }
}

//Function checks for and disables conflicting events depending on checkboxes checked by the user and
//  maintains a total of the amount of money to be charged to the user given user input on any (set of) checkbox element(s) and displays the total
function checkCheckBox(){

  $('.activities span').hide();

  var totalCost = 0;

  if ($('#all').is(":checked")){

    totalCost += 200;

  } else {

    totalCost - 200;
  }

  if ($('#js-frameworks').is(":checked")){

    $('#express').prop('disabled', true);
    $('#express').parent().css("color", "#7c8f9b");
    totalCost += 100;

  } else {

    $('#express').prop('disabled', false);
    $('#express').parent().css("color", "#000");
    totalCost - 100;

  }

  if ($('#express').is(':checked')){

    $('#js-frameworks').prop('disabled', true);
    $('#js-frameworks').parent().css("color", "#7c8f9b");
    totalCost += 100;

  } else {

    $('#js-frameworks').prop('disabled', false);
    $('#js-frameworks').parent().css("color", "#000");
    totalCost - 100;

  }

  if ($('#js-libs').is(":checked")) {

    $('#node').prop('disabled', true);
    $('#node').parent().css("color", "#7c8f9b");
    totalCost += 100;

  } else {

    $('#node').prop('disabled', false);
    $('#node').parent().css("color", "#000");
    totalCost - 100;
  }

  if ($('#node').is(":checked")){

    $('#js-libs').prop('disabled', true);
    $('#js-libs').parent().css("color", "#7c8f9b");
    totalCost += 100;

  } else {

    $('#js-libs').prop('disabled', false);
    $('#js-libs').parent().css("color", "#000");
    totalCost - 100;

  }

  if ($('#build-tools').is(":checked")){

    totalCost += 100;

  } else {

    totalCost - 100;
  }

  if ($('#npm').is(":checked")){

    totalCost += 100;

  } else {

    totalCost - 100;
  }

  //Displays the non-zero total amount to be charged to user based on user checkbox input
  if (totalCost != 0){
    
    $('#totalCost').show();
    
    $('#totalCost').text(function(){

      return 'Total: $' + totalCost;

    });
  }
}

//When user selects a payment option, the appropriate information/forms are displayed while all other payment type information is hidden
function checkPaymentOption(){

  //Hide (or reset) payment option error message and styling
  $('#paymentError').hide();

  if($('select#payment').val() === 'credit card'){

    $('div#credit-card').show();
    $('div#paypal-option').hide();
    $('div#bitcoin-option').hide();

  } else if ($('select#payment').val() === 'paypal'){

    $('div#credit-card').hide();
    $('div#paypal-option').show();
    $('div#bitcoin-option').hide();

  } else if($('select#payment').val() === 'bitcoin'){

    $('div#credit-card').hide();
    $('div#paypal-option').hide();
    $('div#bitcoin-option').show();

  //If user selects "Select Payment Method" from the "Payment Info" dropdown  
  } else if ($('select#payment').val() === 'select_method'){

    $('div#credit-card').hide();
    $('div#paypal-option').hide();
    $('div#bitcoin-option').hide();

    //Display error message
    $('#paymentError').show();
  }
}

//Validate credit card number using the creditCardValidator plugin
function checkCreditCardNumber(){
    
  var ccNumber = $('#cc-number');

  if(!ccNumber.validateCreditCard().length_valid && !ccNumber.validateCreditCard().luhn_valid && !ccNumber.validateCreditCard().valid){

    $('#ccTitle').css({'color': '#9f3b53', 'font-weight':'500'});
    return false;

  } else {

    return true;

  }
}


//Validate zip code with RegEx
function checkZipCode(){

  var zip = $('input#zip');
  var zip_regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    
  //Check that zip code is valid, if not, apply error style
  if(!zip_regex.test(zip.val()) && !zip.val() != ""){
      
    $('#zipTitle').css({'color': '#9f3b53', 'font-weight':'500'});
    return false;

  } else {

    return true;

  }
}

//Validate CVV with RegEx
function checkCVV(){

  var cvv = $("input#cvv");
  var cvv_regex = /^\d{3,4}$/;

  //Check that CVV is valid and if not apply error styling
  if(!cvv_regex.test(cvv.val()) && !cvv.val() != ""){ 
          
    $('#cvvTitle').css({'color': '#9f3b53', 'font-weight':'500'});
    return false;

  } else {

      return true;

  }
}

//Function displays appropriate error messages and styles
function setErrorStyles(){

  //Hide error messages and stylings on page load
    //Hide "please provide your name" error massesage and reset message style
  $('#nameError').hide();
  $('#nameLabel').css({'color': '#000', 'font-weight':'normal'});

  //Hide 'Don\'t forget to pick a T-shirt' T-shirt choice error message
  $('#shirtError').hide();

  //Hide 'Please select an Activity' error message
  $('#activityError').hide();

  //Hide (reset) credit card error styles
  $('#ccTitle').css({'color': '#000', 'font-weight':'normal'});
  $('#zipTitle').css({'color': '#000', 'font-weight':'normal'});
  $('#cvvTitle').css({'color': '#000', 'font-weight':'normal'});

  //Hide the text input that should only show if user selects "Other" from the "Job Role" dropdown menu
  $('#other-title').hide();
}
