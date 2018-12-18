const fs = require('fs'),
	input = fs.readFileSync('data.txt').toString(),
	current = {},
	santa = {},
	santaRobot = {};

current.input = 0,
santa.x = 0,
santa.y = 0,
santaRobot.x = 0,
santaRobot.y = 0,
current.houses = ['0,0'];

while(current.input < input.length){
	let turn;
	if(current.input % 2){
		turn = santaRobot;
	}
	else{
		turn = santa;
	}
	move(turn, input.charAt(current.input));
	add(current.houses, turn.x, turn.y);
	current.input++;
}

function move(object, action){
	if(action === '^'){
		object.y++;
	} else if(action === '>'){
		object.x++;
	} else if(action === 'v'){
		object.y--;
	} else if(action === '<'){
		object.x--;
	}
}

function add(houses, x, y){
	value = [x,y].toString();
	if(houses.includes(value) === false){
		houses.push(value);
	}
}

console.log('total houses: ' + current.houses.length);