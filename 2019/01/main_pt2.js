const fs = require('fs'),
	inputs = fs.readFileSync('data.txt').toString().split('\n'); 

const myProgram = {};
myProgram.run = function(data) {
	this.tests.run();
	console.log(this.tests.logs);

	if (this.tests.testsFailed) {
		console.log(`Since ${this.tests.testsFailed} tests failed, the program execution has been ended. Please fix them before running the program again.` );
	}
	else {
		let fuel = 0;
		for (input of inputs) {
			fuel += this.calculateFuelRequired(input);
		}
		console.log('Fuel required calculation done!\nFuel Required: ', fuel);
	}
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
			expectation: 966,
		},
		{
			fnTesting: 'calculateFuelRequired',
			input: 100756,
			expectation: 50346,
		},
		// One more test for string-type data
		{
			fnTesting: 'calculateFuelRequired',
			input: '12',
			expectation: 2,
		},
	]

	this.logs += "<< RUNNING TESTS >>\n";
	this.testsFailed = 0;
	// Most tests used are the ones described in the advent-of-code puzzle
	for (testInput of testInputs) {
		console.log(this, 'haha');
		console.log(myProgram.tests, 'hehe');
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