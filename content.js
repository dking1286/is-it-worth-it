
setInterval(function() {
var elements = document.getElementsByTagName('*');

chrome.storage.sync.get('salary', function(data) {
	const salary = data.salary;

	for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];


    	if (node.nodeType === 3) {
    		console.log(node);
    		var regexTest = /\$\d+(?:\.\d+)?/gi;
      	var text = node.nodeValue;
     		var numberStrings = text.match(regexTest);
     		var numbers = numberStrings.map(function(numberString) {
     			return parseFloat(numberString.replace(/./, ''));
     		});



      	var hours = convert(price, salary);
      	var replacedText = text.replace(/\$\d+(?:\.\d+)?/gi, 'ONE MILLION DOLLARS');
      	//one million dollars 

        /*

				store salary from user (in the popup.js file)
				match $... from any element and do math in line to calculate the cost of hours of life 
				replace $ with math
				convert salary to hourly  ==> salary / 2087 (hourSalary)
				convert hourSalary to time in hours ==> price of item / hourSalary 
			
        */ 






        if (replacedText !== text) {
            element.replaceChild(document.createTextNode(replacedText), node);
        }
      }
    }
	}
});


}, 10000);

//match returns an array of matches 

//convert returns cost of hours of life 
function convert(price, salary) {
	//assuming price has been converted from a string to a number 
	let hourlyPay = salary / 2087;
	let hoursOfLife = price / hourlyPay; 
	return hoursOfLife; 

}



// const regexTest = /\$\d+(?:\.\d+)?/gi;
// const newMessage = 'one million dollars';
// setInterval(function(){ 
// 	console.log("BEFORE");
// 	var y = document.body.innerHTML.replace(regexTest, newMessage);
// 	console.log(y);
// 	document.body.innerHTML = document.body.innerHTML.replace(regexTest, newMessage);
// 	console.log("AFTER");
// }, 3000); 


