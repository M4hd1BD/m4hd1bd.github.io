var keys = document.querySelectorAll('.key');

keys.forEach(item => {
  item.addEventListener('click', function() {
    test(item);
  });
});


function test(item) {
  var value = item.innerHTML;
  var textField = document.getElementById('textField');
  textField.value = textField.value + value;
}
