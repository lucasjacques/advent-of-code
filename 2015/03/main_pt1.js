const fs = require('fs'),
	input = fs.readFileSync('data.txt').toString();

let housesCount = 0,
	current = [0,0];
	map = [];

while(current < input.length){
	// make the move
	// check if it is duplicate
	//   if not, add to our map 
}

function move(current){
	let returnable = current;
	if('^'){
		returnable[1]++;
		return returnable;
	} else if('>'){
		returnable[0]++;
		return returnable;
	} else if('v'){
		returnable[1]--;
		return returnable;
	} else if('<'){
		returnable[0]--;
		return returnable;
	}
}

console.log('total houses: ' + housesCount);