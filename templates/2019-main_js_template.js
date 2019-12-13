const fs = require('fs'),
	inputs = fs.readFileSync('2019-dummy_data.txt').toString().split('\n'); 

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
		let myNums = 0;
		for (input of inputs) {
			myNums += this.templateFn(input);
		}
		this.logs += 'Template calculation done!\nSum of your numbers: ' + myNums;
	}
	console.log(this.logs);
}

myProgram.templateFn = function(num) {
		return +num;
}

myProgram.tests = {};
myProgram.tests.run = function() {
	this.logs = '';
	// Most tests used are the ones described in the advent-of-code puzzle
	const testInputs = [
		{
			fnTesting: 'templateFn',
			input: 5,
			expectation: 5,
		},
		{
			fnTesting: 'templateFn',
			input: 7,
			expectation: 7,
		},
		{
			fnTesting: 'templateFn',
			input: 666,
			expectation: 666,
		},
		{
			fnTesting: 'templateFn',
			input: 1337,
			expectation: 1337,
		},
		// One more test for string-type data
		{
			fnTesting: 'templateFn',
			input: '1337',
			expectation: 1337,
		},
	]

	this.logs += "<< RUNNING TESTS >>\n";
	this.testsFailed = 0;
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
	let result = myProgram.templateFn(testInput.input);
	return `OOPS! There was a problem during the test of ${testInput.fnTesting} function for the ${typeof testInput.input} ${testInput.input} input. We expected ${typeof testInput.expectation} ${testInput.expectation}, but it resulted in ${typeof result} ${result} !`;
};
myProgram.tests.test.run = function(testInput) {
	return (myProgram[testInput.fnTesting](testInput.input) === testInput.expectation);
}

myProgram.run(inputs);