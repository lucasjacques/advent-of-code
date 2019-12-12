const fs = require('fs'),
	inputs = fs.readFileSync('data.txt').toString().split('\n'); 

const myProgram = {};
myProgram.run = function(data) {
	this.tests.run();
	this.logs = this.tests.logs;
	if (this.tests.testsFailed) {
		if (this.tests.testsFailed === 1)
			this.logs += `Since ${this.tests.testsFailed} test failed, the program execution has been ended. Please fix them before running the program again.`;
		else 
			this.logs += `Since ${this.tests.testsFailed} tests failed, the program execution has been ended. Please fix them before running the program again.`;
	}
	else {
		let fuel = 0;
		for (input of inputs) {
			fuel += this.calculateFuelRequiredRecursive(input);
		}
		this.logs += 'Fuel required calculation done!\nFuel Required: ' + fuel;
	}
	console.log(this.logs);
}

myProgram.calculateFuelRequiredRecursive = function(num) {
	let result = Math.floor(num / 3) - 2;
	if (result < 9) {
		return result;
	}
	else {
		return result + this.calculateFuelRequiredRecursive(result);
	}
}

myProgram.tests = {};
myProgram.tests.run = function() {
	this.logs = '';
	const testInputs = [
		{
			fnTesting: 'calculateFuelRequiredRecursive',
			input: 12,
			expectation: 2,
		},
		{
			fnTesting: 'calculateFuelRequiredRecursive',
			input: 14,
			expectation: 2,
		},
		{
			fnTesting: 'calculateFuelRequiredRecursive',
			input: 1969,
			expectation: 966,
		},
		{
			fnTesting: 'calculateFuelRequiredRecursive',
			input: 100756,
			expectation: 50346,
		},
		// One more test for string-type data
		{
			fnTesting: 'calculateFuelRequiredRecursive',
			input: '12',
			expectation: 2,
		},
	]

	this.logs += "<< RUNNING TESTS >>\n";
	this.testsFailed = 0;
	// Most tests used are the ones described in the advent-of-code puzzle
	for (testInput of testInputs) {
		testInput.result = this.test.run(testInput);
		this.testsFailed += !testInput.result;
		this.logs += this.test.toText(testInput) + '\n';
	}
	if (this.testsFailed === 1){
		this.logs += `<< TESTS ENDED WITH ${this.testsFailed} TEST FAILED>>\n\n`;	
	}
	else {
		this.logs += `<< TESTS ENDED WITH ${this.testsFailed} TESTS FAILED>>\n\n`;
	}
}

myProgram.tests.test = {};
myProgram.tests.test.toText = function(testInput) {
	if (testInput.result) {
		return `The test of ${testInput.fnTesting} function for the ${typeof testInput.input} ${testInput.input} input runned smoothly!`;
	}
	return `OOPS! There was a problem during the test of ${testInput.fnTesting} function for the ${typeof testInput.input} ${testInput.input} input. We expected ${testInput.expectation}, but it resulted in ${myProgram[testInput.fnTesting](testInput.input)} !`;
};
myProgram.tests.test.run = function(testInput) {
	return (myProgram[testInput.fnTesting](testInput.input) === testInput.expectation);
}

myProgram.run(inputs);