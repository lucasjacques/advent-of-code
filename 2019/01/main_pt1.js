const fs = require('fs'),
	inputs = fs.readFileSync('data.txt').toString().split('\n'); 
const myProgram = {};

myProgram.run = function(data) {
	this.tests.run();
	console.log(this.tests.logs);


	let fuel = 0;
	for (input of inputs) {
		fuel += this.calculateFuelRequired(input);
	}
	console.log('Fuel required calculation done!\nFuel Required: ', fuel);
}

myProgram.calculateFuelRequired = function(num) {
	return Math.floor(num / 3) - 2;
}

myProgram.tests = {};
myProgram.tests.run = function() {
	this.logs = '';
	const testInputs = [
		{
			fnTesting: 'calculateFuelRequired',
			input: 12,
			expectation: 2,
		},
		{
			fnTesting: 'calculateFuelRequired',
			input: 14,
			expectation: 2,
		},
		{
			fnTesting: 'calculateFuelRequired',
			input: 1969,
			expectation: 654,
		},
		{
			fnTesting: 'calculateFuelRequired',
			input: 100756,
			expectation: 33583,
		},
		// One more test for string-type data
		{
			fnTesting: 'calculateFuelRequired',
			input: '12',
			expectation: 2,
		},
	]

	this.logs += "<< RUNNING TESTS >>\n";

	// Most tests used are the ones described in the advent-of-code puzzle
	for (testInput of testInputs) {
		this.logs += this.test.toText(
			this.test.run(
				testInput
			),
			testInput
		) + '\n';
	}
	
	this.logs += "<< TESTS ENDED >>\n\n";	
}

myProgram.tests.test = {};
myProgram.tests.test.toText = function(result, testInput) {
	if (result) {
		return `The test of ${testInput.fnTesting} function for the ${typeof testInput.input} ${testInput.input} input runned smoothly!`;
	}
	return `Oops! There was a problem during the test of ${testInput.fnTesting} function for the ${typeof testInput.input} ${testInput.input} input. We expected ${testInput.expectation}, but it resulted in ${myProgram[testInput.fnTesting](testInput.input)} !`;
};
myProgram.tests.test.run = function(testInput) {
	return (myProgram[testInput.fnTesting](testInput.input) === testInput.expectation);
}

myProgram.run(inputs);