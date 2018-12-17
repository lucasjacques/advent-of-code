const fs = require('fs'),
	input = fs.readFileSync('data.txt').toString(),
	array = input.split('\r\n');

let totalSquares = 0,
	totalRibbons = 0;

array.forEach(function (element){
	const current = element.split('x'),
		length = current[0],
		width = current[1],
		height = current[2],
		minorFace = obtainMinorMult(length, width, height),
		subTotalSquares = 2 * length * width +
			2 * length * height +
			2 * width * height +
			minorFace[0] * minorFace[1];
		subTotalRibbons = length * width * height +
			minorFace[0] * 2 +
			minorFace[1] * 2;
	totalSquares += subTotalSquares;
	totalRibbons += subTotalRibbons;
});

console.log('total squares: ' + totalSquares);
console.log('total ribbons: ' + totalRibbons);

function obtainMinorMult (a, b, c) {
	const mult1 = a*b,
		mult2 = a*c,
		mult3 = b*c;

	if(mult1 < mult2){
		if(mult1 < mult3)
			return [a,b];
		else
			return [b,c];
	}
	else {
		if (mult2 < mult3)
			return [a,c];
		else
			return [b,c];
	}
}