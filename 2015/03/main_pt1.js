const fs = require('fs'),
	input = fs.readFileSync('data.txt').toString(),
	current = {};

current.input = 0,
current.x = 0,
current.y = 0,
current.houses = ['0,0'];

while(current.input < input.length){
	move(current, input.charAt(current.input));
	add(current.houses, current.x, current.y);
	current.input++;
}

function move(current, position){
	if(position === '^'){
		current.y++;
	} else if(position === '>'){
		current.x++;
	} else if(position === 'v'){
		current.y--;
	} else if(position === '<'){
		current.x--;
	}
}

function add(houses, x, y){
	value = [x,y].toString();
	if(houses.includes(value) === false){
		houses.push(value);
	}
}

console.log('total houses: ' + current.houses.length);
