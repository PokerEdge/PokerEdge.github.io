//Give focus to input#name text input on page load
$('input#name').focus();

//Add and hide a span element that will hold the text for the total cost the user will pay upon checking events and registering
$('.activities').append('<span id="totalCost"></span>');
$('.activities span').hide();

//Error messages and styling edits to be dynamically inserted
$('#nameLabel').append('<span id="nameError">' + ' (please provide your name)' + '</span>').css({'color': '#9f3b53', 'font-weight':'500'});
$('#emailLabel').append('<span id="emailError">' + ' (please provide a valid email address)' + '</span>').css({'color': '#9f3b53', 'font-weight':'500'});

$('.shirt legend').append('<br><span id="shirtError">' + ' Don\'t forget to pick a T-shirt' + '</span>');
$('.shirt span').css({'color': '#9f3b53', 'font-weight':'500', 'font-size':'16px'});

$('.activities legend').append('<br><span id="shirtError">' + ' Please select an Activity' + '</span>');
$('.activities span').css({'color': '#9f3b53', 'font-weight':'500', 'font-size':'16px'});

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
$('.activities legend').hide();

  //Hide (reset) credit card error styles
$('#ccTitle').css({'color': '#000', 'font-weight':'normal'});
$('#zipTitle').css({'color': '#000', 'font-weight':'normal'});
$('#cvvTitle').css({'color': '#000', 'font-weight':'normal'});

//Initially hide the text input that should only show if user selects "Other" from the "Job Role" dropdown menu
$('#other-title').hide();

//Hides all color selections until a Design element is chosen from the Deisgn drop down menu
$('select#color').children(":nth-child(n+1)").hide();

//Hide all payment option information on page load that is to be displayed after user chooses an option from the Payment Info dropdown menu
$('div#credit-card').show();
$('div#paypal-option').hide();
$('div#bitcoin-option').hide();


//Apply handler to dropdown menu to take actions when the values change
$('select#title').change(function(){

  checkJobRoleValue();

});

//Apply handler to....
$('select#design').change(function(){

  checkDesignValue();

});

//Apply handler to....
$('input:checkbox').change(function(){ //Event handler isn't correct because checkbox value is always the same

  checkCheckBox();

});

//Apply handler to....
$('select#payment').change(function(){ //Event handler isn't correct because checkbox value is always the same

  checkPaymentOption();

});

//Apply handler to....
$('button[type="submit"]').click(function(){ //Event handler isn't correct because checkbox value is always the same

  validateForm();

});



//Function checks to see which 'Job Role' value is selected, then shows or hides a text field based on the selected value
function checkJobRoleValue(){

  if($('select#title').val() === 'other'){

    $('#other-title').show();

  } else{

    $('#other-title').hide();

  }
}

//Function checks...
function checkDesignValue(){


$('select#color').children().show();


  if($('select#design').val() === 'js puns'){ //Check if selected design value is "js puns" or "heart js"

    //If design value is "js puns", color menu should display options "Cornflower Blue", "Dark Slate Grey" and "Gold" (top 3 elements in list)

    // $('select#color').children(":nth-child(n+1)").hide(); //Hide first child
    $('select#color').children(":nth-child(n+5)").hide();


  } else if ($('select#design').val() === 'heart js') {

    //Else if design value is "heart js", color menu should display options "Tomato", "Steel Blue" and "Dim Grey" (bottom 3 elements in list)
    // $('select#color').children(":nth-child(n+1)").hide(); //Hide first child
    $('select#color').children(":nth-child(-n+4)").hide();

  } else {

    //Else if design value is not one of the choices, hide options except "<-- Please select T-shirt theme"
    $('select#color').children(":nth-child(n+1)").hide(); 

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
  if (totalCost !== 0){
    $('.activities span').show();
    
    $('.activities span').text(function(){
      return 'Total: $' + totalCost;
    });

  }
}

//When user selects a payment option, the appropriate information/forms are displayed while all other payment type information is hidden
function checkPaymentOption(){

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
  } else {

    $('div#credit-card').hide();
    $('div#paypal-option').hide();
    $('div#bitcoin-option').hide();    
  }

}

function validateForm(){

  //   Form validation: display error messages and don't let the user submit the form (submit() or reset() register button depending on conditions) if 
  //   any of these validation errors exist:
  //     Name field can't be empty
  //     Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted 
  //      like one: dave@teamtreehouse.com for example. You'll need to use a regular expression to get this requirement. See the list of Resources for links to learn about regular expressions.
  //     At least one activity must be checked from the list under "Register for Actitivities."
  //     Payment option must be selected.
  //     If "Credit card" is the selected payment option, make sure the user supplied a credit card number, a zip 
  //     code, and a 3 number CVV value.

  //Set conditions for form submit() - All form elements validated

  console.log("Click handler is firing");

  //READ ABOUT ERROR HANDLING ARRAYS
  
  //HIDE AND RESET ALL ERROR STYLINGS AFTER INPUT FORMS ARE RESET

  //Check if name input text field is empty
    //If name input text is not empty, then it is valid
  if($('input#name').indexOf() !== -1 &&  

  //Check if email input text field contains a valid email address of the format dave@teamtreehouse.com
    //Use a "Regular expression" - linked from the Treehouse instructions
    //check for text before @ symbol
    //check that email contains @ symbol
    //check for text after @ symbol
    //check email address ends in '.com'
      //Check that the final period in the email address is before the string "com"

  //Check that at least 1 Activity is checked

  //Payment option must be selected (CC is selected by defualt, but can check if payment option val === "Select Payment Method")

  //Check that credit card is valid (can use a plug in to actually check if the card is real and is valid)
    //Write new function for credit card validation to help with plug in implementation
    //Check that card number is valid
      //Check that card number is exactly 16 digits in length
        //Check that input is all numbers
      //(OR use the plug in to validate the CCN)
    //Check that zip code is valid
      //Check that input is all numbers
      //Check that zip code number is exactly 5 digits in length
      //(OR use plug in to validate zip code)
    //Check that CVV is valid
      //Check that input is all numbers
      //Check that input is exactly 3 characters in length

}



/*

********** INTERACTIVE FORM PROJECT REQUIREMENTS **********

**Create and link a JavaScript file to index.html
  Create a JavaScript file inside the "js" folder and link it to index.html
  If you're using jQuery, link index.html to the latest version of jQuery

**"Job Role" section of the form: reveal a text field when the "Other" option 
is selected from the "Job Role" drop down menu
  Make sure you add an text input field
  Use the id of "other-title" for the field
  Add placeholder text of "Your Title" for the field

**"T-Shirt Info" section of the form: for the T-Shirt color menu, only display the options that match 
the design selected in the "Design" menu.
  If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," 
    "Dark Slate Grey," and "Gold."
  If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," 
    and "Dim Grey."

**"Register for Activities" section of the form:
  Some events are at the same time as others. If the user selects a workshop, don't allow selection 
    of a workshop at the same date and time -- you should disable the checkbox and visually indicate that 
    the workshop in the competing time slot isn't available.
  When a user unchecks an activity, make sure that competing activities (if there are any) are no longer 
    disabled.
  As a user selects activities to register for, a running total is listed below the list of checkboxes. 
    For example, if the user selects "Main conference" then Total: $200 should appear. If they add 1 workshop, 
    the total should change to Total: $300.

**Payment Info section of the form: display payment sections based on chosen payment option
  The "Credit Card" payment option should be selected by default and result in the display of the #credit-card 
    div, and hide the "Paypal" and "Bitcoin information.
  When a user selects the "PayPal" payment option, display the Paypal information, and hide the credit card 
    information and the "Bitcoin" information.
  When a user selects the "Bitcoin" payment option, display the Bitcoin information, and hide the credit card 
    information. 

**Set focus on the first text field:
  When the page loads, give focus to the first text field

Form validation: display error messages and don't let the user submit the form (submit() or reset() register button depending on conditions) if 
  any of these validation errors exist:
    Name field can't be empty
    Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's 
      formatted like one: dave@teamtreehouse.com for example. You'll need to use a regular expression to get this requirement. See the list
      of Resources for links to learn about regular expressions.
    At least one activity must be checked from the list under "Register for Actitivities."
    Payment option must be selected.
    If "Credit card" is the selected payment option, make sure the user supplied a credit card number, a zip code, and a 3 number CVV value.

No color options appear in the “Color” menu until the user chooses a T-Shirt theme. The Color menu reads “Please select a T-shirt theme” 
  until a theme is selected from the “Design” menu. (Hide the first option once selection changes! rest is complete)

Make sure your program is free of syntax errors.
  You can monitor any errors by looking at the Developer Tools console in your browser.
  Use jsHint (see Resources links) to check your code for syntax and formatting problems.

Make sure you add code comments to explain how your programming works.

When JavaScript is switched off or unavailable, all information required to be filled out should be visible. 
  For example, the “Your Job Role” text field should already be available if someone selects “Other."

Before you submit your project for review, make sure you can check off all of the items on the Student Project 
  Submission Checklist. The checklist is designed to help you make sure you’ve met the grading requirements 
  and that your project is complete and ready to be submitted!  

*/



/*

********** EXTRA CREDIT **********

Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.

Style the "select" menus (drop down menus) on the form, so they match the styling of the text fields

Validate the credit card number to make sure it's entered in a valid format $('#cvv')

*/