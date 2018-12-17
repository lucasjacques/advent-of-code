const fs = require('fs'),
	input = fs.readFileSync('data.txt').toString(),
	array = input.split('\r\n');

let total = 0;

array.forEach(function (element){
	const current = element.split('x'),
		length = current[0],
		width = current[1],
		height = current[2],
		lw = length * width,
		lh = length * height,
		wh = width * height, 
		subTotal = 2*lw + 2*lh + 2*wh 
			+ obtainMinor(lw, lh, wh);
	
	total += subTotal;	
});

console.log('total: ' + total);

function obtainMinor (a, b, c) {
	if(a < b){
		if(a < c)
			return a;
		else
			return c;
	}
	else {
		if (b < c)
			return b;
		else
			return c;
	}
}