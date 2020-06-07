var keys = document.querySelectorAll('.key');

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
    newTextFieldValue = textFieldValue.replace(textFieldValue[textFieldLenght - 1],'');
    textFieldID.value = newTextFieldValue;
  }
  else {
    textFieldID.value = textFieldValue + value;
  }

}
