//Append total cost below list of activities
  //Hide if cost is $0
  //Append THIS HTML IN ORDER TO HIDE/SHOW IT AS IT UPDATES ON CHANGE OF CHECKBOX
  // $('.activities').append('<span id="totalCost">$' + totalCost + '</span>')


//Hide conflicting data error message and styling on page load


//Initially hide the text input that should only show if user selects "Other" from the "Job Role" dropdown menu
$('#other-title').hide();

//Hides all color selections until a Design element is chosen from the Deisgn drop down menu
$('select#color').children(":nth-child(n+1)").hide();

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

//Function checks to see which 'Job Role' value is selected, then shows or hides a text field based on the selected value
function checkJobRoleValue(){

  if($('select#title').val() === 'other'){

    $('#other-title').show();

  } else{

    $('#other-title').hide();

  }
}


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

  // "Register for Activities" section of the form:

  //   As a user selects activities to register for, a running total is listed below the list of checkboxes. 
  //     For example, if the user selects "Main conference" then Total: $200 should appear. If they add 1 workshop, 
  //     the total should change to Total: $300.

  
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

//Hide the total cost message as a reset before a new total cost is calculuate onChange of checkbox value
  //possibly manipulate the innerHTML or text() of the styled span element?


// $('.activities span').hide();
// $('.activities span').show();

  // $('.activities').remove('<span id="totalCost">$' + totalCost + '</span>');
  $('.activities').append('<span id="totalCost">$' + totalCost + '</span>'); //Should simply show the message here (append globally?)
  console.log("$" + totalCost);

}







/*

********** INTERACTIVE FORM PROJECT REQUIREMENTS **********

**Create and link a JavaScript file to index.html
  Create a JavaScript file inside the "js" folder and link it to index.html
  If you're using jQuery, link index.html to the latest version of jQuery

**Set focus on the first text field:
  When the page loads, give focus to the first text field

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

No color options appear in the “Color” menu until the user chooses a T-Shirt theme. The Color menu reads “Please select a T-shirt theme” 
  until a theme is selected from the “Design” menu.

"Register for Activities" section of the form:
  Some events are at the same time as others. If the user selects a workshop, don't allow selection 
    of a workshop at the same date and time -- you should disable the checkbox and visually indicate that 
    the workshop in the competing time slot isn't available.
  When a user unchecks an activity, make sure that competing activities (if there are any) are no longer 
    disabled.
  As a user selects activities to register for, a running total is listed below the list of checkboxes. 
    For example, if the user selects "Main conference" then Total: $200 should appear. If they add 1 workshop, 
    the total should change to Total: $300.

Payment Info section of the form: display payment sections based on chosen payment option
  The "Credit Card" payment option should be selected by default and result in the display of the #credit-card 
    div, and hide the "Paypal" and "Bitcoin information.
  When a user selects the "PayPal" payment option, display the Paypal information, and hide the credit card 
    information and the "Bitcoin" information.
  When a user selects the "Bitcoin" payment option, display the Bitcoin information, and hide the credit card 
    information.

Form validation: display error messages and don't let the user submit the form if any of these validation errors exist:
  Name field can't be empty
  Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example. You'll need to use a regular expression to get this requirement. See the list of Resources for links to learn about regular expressions.
  At least one activity must be checked from the list under "Register for Actitivities."
  Payment option must be selected.
  If "Credit card" is the selected payment option, make sure the user supplied a credit card number, a zip 
    code, and a 3 number CVV value.

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