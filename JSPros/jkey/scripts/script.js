var keys = document.querySelectorAll('.key');
var textFieldID = document.getElementById('textField');
var shiftIsActive = false;
var shiftIsHard = false;
var firstLayout = document.getElementById('firstLayout');
var secondLayout = document.getElementById('secondLayout');

//functions to switch keyboard layout when that particular button is pressed
function getSpecials() {
  firstLayout.className = "hideLayout";
  secondLayout.className = "row";
}

function getRegulars() {
  secondLayout.className = "hideLayout";
  firstLayout.className = "row";
}

//function to keep textarea always focused
textFieldID.addEventListener("blur", function() {
  setTimeout(function() {
    textFieldID.focus();
  }, 0);
});

//adding an event listener to every key so that I can execute the function
keys.forEach(item => {
  item.addEventListener('click', function() {
    keyPressed(item);
  });
});

//defining the function so that it can enter whatever user pressed
function keyPressed(item) {
  var value = item.innerHTML;
  var textFieldValue = textFieldID.value;
  var textFieldLenght = textFieldValue.length;

  //adding backspace functionality so that if user press it, it deletes the last character
  if (item.id == 'backpsace') {
    newTextFieldValue = textFieldValue.substring(0, textFieldLenght - 1);
    textFieldID.value = newTextFieldValue;
  }

  //adding shift button functionality so that if user press it once it only make
  //the character uppercase for once and if user press it twice character stays
  //uppercase untill user press it for third time
  else if (item.id == 'shift') {

    //this scenario is for if user press the shift key previous time, if user did
    //then making sure it stays that way, I mean uppercase
    if (shiftIsActive && !shiftIsHard) {
      shiftIsActive = true;
      shiftIsHard = true;
      keys.forEach(item => {
        var keyValue = item.innerHTML;
        item.innerHTML = keyValue.toUpperCase();
      });
    }

    //this is for if user already pressed the shift key twice, it is for third time
    //shift button will be reseted this time
    else if (shiftIsActive && shiftIsHard) {
      keys.forEach(item => {
        var keyValue = item.innerHTML;
        item.innerHTML = keyValue.toLowerCase();
      });
      shiftIsActive = false;
      shiftIsHard = false;
    }

    //this is for the first time user press the shift key, making the character
    //uppercase and setting the control variable
    else if (!shiftIsActive && !shiftIsHard) {
      keys.forEach(item => {
        var keyValue = item.innerHTML;
        item.innerHTML = keyValue.toUpperCase();
      });
      shiftIsActive = true;
    }
  }

  //simply adding a space if user press the space button
  else if (item.id == 'space') {
    textFieldID.value = textFieldValue + ' ';
  }

  //simply adding a new line if user press the enter button
  else if (item.id == 'enter') {
    textFieldID.value = textFieldValue + "\n";
  }

  //if user want to write any special character which isn't already here
  else if (item.id == 'getSpecials') {
    getSpecials();
  }

  //if user wants to go back to write characters
  else if (item.id == 'getRegulars') {
    getRegulars();
  }

  //basically for everyother button, inserting whatever assigned to it
  else {

    //checking if shift is already pressed twice, if it is then just inserting
    //the previously changed uppercase characters and doing nothing else
    if (shiftIsActive && shiftIsHard) {
      textFieldID.value = textFieldValue + value;
    }

    //this is for if shift is pressed once then just inserting the changed uppercase
    //character and restting them to lowercase
    else if (shiftIsActive && !shiftIsHard) {
      textFieldID.value = textFieldValue + value;
      keys.forEach(item => {
        var keyValue = item.innerHTML;
        item.innerHTML = keyValue.toLowerCase();
      });
      shiftIsActive = false;
    }

    //this is for other scenarios like shift is not pressed once or shift is
    //pressed three times which is basically shift not got pressed once
    else {
      textFieldID.value = textFieldValue + value;
    }
  }

}
