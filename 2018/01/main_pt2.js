const fs = require('fs'),
	input = fs.readFileSync('data.txt').toString().split('\n'); 
let frequency = 0,
	frequencyTwice = false,
	history = [0],
	i = 0;


while(frequencyTwice === false){
	frequency += Number(input[i]);
	if (deepSearch(frequency,history)){
		frequencyTwice = true;
		break;
	}
	else{
		history.push(frequency);
	}
	if(i < input.length -1)
		i++;
	else
		i = 0;		
}

function deepSearch(needle, haystack){
	let found = false;
	haystack.forEach(function(element) {
		if(element === needle){
			found = true;
		}
	});
	return found;
}

console.log('frequencyDuplicated: ' + frequency);
