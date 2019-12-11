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
	return Math.floor(num / 3) - 2;
}

myProgram.tests = {};
myProgram.tests.run = function() {
	this.logs = '';
	const testInputs = [
		{
			funcTesting: 'divideAndRoundDown',
			input: 12,
			expectation: 2
		},
		{
			funcTesting: 'divideAndRoundDown',
			input: 14,
			expectation: 2
		},
		{
			funcTesting: 'divideAndRoundDown',
			input: 1969,
			expectation: 654
		},
		{
			funcTesting: 'divideAndRoundDown',
			input: 100756,
			expectation: 33583
		},
		// one more for string-type data
		{
			funcTesting: 'divideAndRoundDown',
			input: '12',
			expectation: 2
		},
	]

	this.logs += "<< RUNNING TESTS >>\n";

	// tests used on the advent of code
	for (testInput of testInputs) {
		this.logs += this.test.toText(
			this.test.run(
				testInput
			),
			testInput
		) + '\n';
	}
	
	this.logs += "<< TESTS ENDED >>\n";	
}

myProgram.tests.test = {};
myProgram.tests.test.toText = function(result, testInput) {
	if (result) {
		return `The test of ${testInput.funcTesting} function for the ${typeof testInput.input} ${testInput.input} input runned smoothly!`;
	}
	return `Oops! There was a problem during the test of ${testInput.funcTesting} function. We expected ${testInput.expectation}, but it resulted in ${myProgram[testInput.funcTesting](testInput.input)} !`;
};
myProgram.tests.test.run = function(testInput) {
	return (myProgram[testInput.funcTesting](testInput.input) === testInput.expectation);
}

myProgram.run(input);