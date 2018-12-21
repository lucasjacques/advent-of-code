const fs = require('fs'),
	input = fs.readFileSync('data.txt').toString().split('\n'); 
let frequency = 0,
	history = [];

// input.forEach(function(element, key){
// 	if(deepSearch(history, element) != true){
// 		history.push({'value': element,
// 					  'quantity' : 1})
// 	}
// 	frequency+=Number(element);
// });

// function deepSearch(needle, haystack){
// 	Object.keys(haystack).forEach(function(element) {
// 		if(element.value === needle){
// 			return true;
// 		}
// 	});
// }

console.log('frequency: ' + frequency);