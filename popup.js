//$(document).ready(function() { jQuery

document.addEventListener("DOMContentLoaded", function() {

		var header = document.createElement('header');
		header.setAttribute('id', 'header');
		header.innerHTML = "Is It Worth It?"

		var salaryInput = document.createElement('input');
		salaryInput.setAttribute('type', 'text');
		salaryInput.setAttribute('placeholder', 'Enter Salary');
		salaryInput.setAttribute('id', 'salary');

		var or = document.createElement('p');
		or.setAttribute('id', 'or');
		or.innerHTML = "-or-"

		var hourInput = document.createElement('input');
		hourInput.setAttribute('type', 'text');
		hourInput.setAttribute('placeholder', 'Enter Hourly Rate');
		hourInput.setAttribute('id', 'hourRate');

		var submit = document.createElement('input');
		submit.setAttribute('id', 'submitBtn');
		submit.setAttribute('type', 'submit');
		submit.setAttribute('value', "submit");

		var showSalary = document.createElement("p");
		showSalary.setAttribute('id', 'salary-display');
		//showSalary.innerHTML = "Current Hourly Rate";

		chrome.storage.sync.get('salary', function(data) {

				//added the converToHourly function and passed in data.salary 
				showSalary.innerHTML = `Current Hourly Rate: $${round(convertToHourly(data.salary), 2)}`;
				console.log('Retrived salary ' + data.salary);
		});

		document.body.appendChild(header);
		document.body.appendChild(salaryInput);
		document.body.appendChild(or);
		document.body.appendChild(hourInput);
		document.body.appendChild(submit);
		document.body.appendChild(showSalary);


		function myListener(event) {
				var salary = salaryInput.value;
				var hourly = hourInput.value;
				//var salary = input.value; 
				//showSalary.innerHTML = salary;
				//input.value = '';
				//storage in some location in memory 
				
				// chrome.storage.sync.set({ 'salary': salary }, function() {
				// 		console.log("salary", salary);
				// });

				if (salary && hourly) {
						showSalary.innerHTML = "Enter 1 Value Please";
						return showSalary.innerHTML;

				} else if (!salary && !hourly) {
						showSalary.innerHTML = "Enter 1 Value Please";
						return showSalary.innerHTML;
				} else {
						if (salary) {
							chrome.storage.sync.set({ 'salary': salary }, function() {
							console.log("salary", salary);
							});
								showSalary.innerHTML = `Current Hourly Rate: $${round(convertToHourly(salary), 2)}`;
								return showSalary.innerHTML;
						} else {
							chrome.storage.sync.set({ 'salary': convertToSalary(hourly) }, function() {
							console.log("salary", convertToSalary(hourly));
							});
								showSalary.innerHTML = `Current Hourly Rate: $${hourly}`;
								return showSalary.innerHTML;
						}
				}
		}

		submit.addEventListener('click', myListener);

});

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function convertToHourly(salary) {
		//assuming price has been converted from a string to a number 
		let hourlyRate = salary / 2087;
		return hourlyRate;
}

function convertToSalary(hourlyRate) {
	let salary = 2087 * hourlyRate;
	return salary; 
}
