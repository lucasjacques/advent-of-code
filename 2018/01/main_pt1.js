const fs = require('fs'),
	input = fs.readFileSync('data.txt').toString().split('\n'); 
let frequency = 0;

input.forEach(function(element, key){
	frequency+=Number(element);
});

console.log('frequency: ' + frequency);
