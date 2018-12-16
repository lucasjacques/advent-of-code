const fs = require('fs');
const input = fs.readFileSync('data.txt').toString(); 

let current = 0,
	level = 0,
	firstTime = true;
while(current < input.length){
	if(input.charAt(current) == '('){
		level++;
	} else if (input.charAt(current) == ')') {
		level--;
	}
	current++;
	if(level === -1 && firstTime === true){
		console.log('[1.2] position for 1st basement: ' + current);
		firstTime = false;
	}
}
console.log('[1.1] level: ' + level);
