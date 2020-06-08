var keys = document.querySelectorAll('.key');
var shiftIsActive = false;
var shiftIsHard = false;

keys.forEach(item => {
  item.addEventListener('click', function() {
    test(item);
  });
});

function test(item) {
  var value = item.innerHTML;
  var textFieldID = document.getElementById('textField');
  var textFieldValue = textFieldID.value;
  var textFieldLenght = textFieldValue.length;

  if (item.id == 'backpsace') {
    newTextFieldValue = textFieldValue.substring(0, textFieldLenght - 1);
    textFieldID.value = newTextFieldValue;
  }
  else if (item.id == 'shift') {
    if (shiftIsActive && !shiftIsHard) {
      shiftIsActive = true;
      shiftIsHard = true;
      keys.forEach(item => {
        var keyValue = item.innerHTML;
        item.innerHTML = keyValue.toUpperCase();
      });
    }
    else if (shiftIsActive && shiftIsHard) {
      keys.forEach(item => {
        var keyValue = item.innerHTML;
        item.innerHTML = keyValue.toLowerCase();
      });
      shiftIsActive = false;
      shiftIsHard = false;
    }
    else if (!shiftIsActive && !shiftIsHard) {
      keys.forEach(item => {
        var keyValue = item.innerHTML;
        item.innerHTML = keyValue.toUpperCase();
      });
      shiftIsActive = true;
    }
  }
  else if (item.id == 'space') {
    textFieldID.value = textFieldValue + ' ';
  }
  else if (item.id == 'enter') {
    textFieldID.value = textFieldValue + "\n";
  }
  else {
    if (shiftIsActive && shiftIsHard) {
      textFieldID.value = textFieldValue + value;
    }
    else if (shiftIsActive && !shiftIsHard) {
      textFieldID.value = textFieldValue + value;
      keys.forEach(item => {
        var keyValue = item.innerHTML;
        item.innerHTML = keyValue.toLowerCase();
      });
      shiftIsActive = false;
    }
    else {
      textFieldID.value = textFieldValue + value;
    }
  }

}
