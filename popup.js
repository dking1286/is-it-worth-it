//$(document).ready(function() { jQuery

document.addEventListener("DOMContentLoaded", function() {

  var input = document.createElement('input'); 
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Enter Salary');
  input.setAttribute('id', 'salary'); 


  var submit = document.createElement('input');
  submit.setAttribute('id', 'submitBtn');
  submit.setAttribute('type', 'submit');
  submit.setAttribute('value', "submit");

  var showSalary = document.createElement("p");
  showSalary.setAttribute('id', 'salary-display');

  chrome.storage.sync.get('salary', function(data) {
    showSalary.innerHTML = data.salary;
    console.log('Retrived salary ' + data.salary);
  });

  document.body.appendChild(input);
  document.body.appendChild(submit);
  document.body.appendChild(showSalary);


  function myListener(event) {
    var salary = input.value; 
    showSalary.innerHTML = salary;
    input.value = '';
    //storage in some location in memory 
    chrome.storage.sync.set({'salary': salary}, function() {
      console.log("salary", salary); 
    });
  }



  submit.addEventListener('click', myListener);


});