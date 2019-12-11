const fs = require('fs'),
	input = fs.readFileSync('data.txt').toString().split('\n'); 
const myProgram = {};

myProgram.run = function(data) {
	let myIndex = 0;
	for (var i = data.length - 1; i >= 0; i--) {
		myIndex++;
	}
	myProgram.tests.run();
	console.log(myProgram.tests.logs);
}

myProgram.divideAndRoundDown = function(num) {
	return Math.floor(num / 3);
}

myProgram.tests = {logs: ''};
myProgram.tests.run = function() {
	const testInputs = {
		funcTesting: 'divideAndRoundDown',
	}

	this.logs += "<< RUNNING TESTS >>\n";

	// tests used on the advent of code
	this.logs += this.test.toText(this.test.run('divideAndRoundDown', 12, 4), 'divideAndRoundDown', 12, 4) + '\n';
	// TODO myProgram.divideAndRoundDown(14);
	// TODO myProgram.divideAndRoundDown(1969);
	// TODO myProgram.divideAndRoundDown(100756);

	// TODO // one more for string data
	// TODO myProgram.divideAndRoundDown('12'));
	
	this.logs += "<< TESTS ENDED >>\n";	
}

myProgram.tests.test = {};
myProgram.tests.test.toText = function(result, funcTesting, input, expectation) {
	if (result) {
		return `The test of ${funcTesting} function runned smoothly!`;
	}
	return `Oops! There was a problem during the test of ${funcTesting} function. We expected ${expectation}, but it resulted in ${myProgram[funcTesting](input)} !`;
};
myProgram.tests.test.run = function(funcTesting, input, expectation) {
	return (myProgram[funcTesting](input) === expectation);
}




myProgram.run(input);