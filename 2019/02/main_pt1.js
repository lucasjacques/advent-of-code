const fs = require('fs'),
	inputs = fs.readFileSync('data.txt').toString().split(','); 

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
		this.prepareProgram(inputs);
		result = this.executeProgram(inputs);
		this.logs += `The program has finished its execution. This is the result: ${result}\n`
	}
	console.log(this.logs);
}

// the following changes are explicitly requested in the current advent-of-code puzzle
myProgram.prepareProgram = function(program) {
	program[1] = 12;
	program[2] = 2;
}

myProgram.executeProgram = function(program) {
	let result, tmp = program.slice(), trackedValue = [];
	for (let i = 0; i < tmp.length; i += 4) {
		result = this.executeProgramCodeLine(tmp, i, trackedValue);
		if (result === 'halt'){
			if (+trackedValue[0] === i-1){
				return tmp[i-1];
			}
			return tmp[ tmp[i-1] ];
		};
	}
}

myProgram.executeProgramCodeLine = function(prog, readingPos, tracked) {
		let calculated;
		switch (+prog[readingPos]) {
			// sum
			case 1:
				tracked[0] = prog[readingPos+3];
				calculated =
				+prog[ prog[readingPos+1] ] +
				+prog[ prog[readingPos+2] ];
				prog[ prog[readingPos+3] ] = calculated;
				return;
		
			// multiplication
			case 2:
				tracked[0] = prog[readingPos+3];
				calculated = 
					prog[ prog[readingPos+1] ] *
					prog[ prog[readingPos+2] ];
				prog[ prog[readingPos+3] ] = calculated;
				return;	

			// halt
			case 99:
				return 'halt';
		}
}


myProgram.tests = {};
myProgram.tests.run = function() {
	this.logs = '';
	// Most tests used are the ones described in the advent-of-code puzzle
	const testInputs = [
		{
			fnTesting: 'executeProgram',
			input: '1,0,0,0,99'.split(','),
			expectation: 2,
		},
		{
			fnTesting: 'executeProgram',
			input: '2,3,0,3,99'.split(','),
			expectation: 6,
		},
		{
			fnTesting: 'executeProgram',
			input: '2,4,4,5,99,0'.split(','),
			expectation: 9801,
		},
		{
			fnTesting: 'executeProgram',
			input: '1,1,1,4,99,5,6,0,99'.split(','),
			expectation: 30,
		},
	];

	this.logs += "<< RUNNING TESTS >>\n";
	this.testsFailed = 0;
	for (testInput of testInputs) {
		let tmpResults = this.test.run(testInput);
		testInput.result = tmpResults[0];
		testInput.passed = tmpResults[1];
		this.testsFailed += !testInput.passed;
		this.logs += this.test.toText(testInput) + '\n';
	}
	if (this.testsFailed === 1){
		this.logs += `<< TESTS ENDED WITH ${this.testsFailed} TEST FAILED >>\n\n`;	
	}
	else {
		this.logs += `<< TESTS ENDED WITH ${this.testsFailed} TESTS FAILED >>\n\n`;
	}
}

myProgram.tests.test = {};
myProgram.tests.test.toText = function(testInput) {
	if (testInput.passed) {
		return `The test of ${testInput.fnTesting} function for the ${typeof testInput.input} ${testInput.input} input runned smoothly!`;
	}
	return `OOPS! There was a problem during the test of ${testInput.fnTesting} function for the ${typeof testInput.input} ${testInput.input} input. We expected ${typeof testInput.expectation} ${testInput.expectation}, but it resulted in ${typeof testInput.result} ${testInput.result} !`;
};
myProgram.tests.test.run = function(testInput) {
	let result = myProgram[testInput.fnTesting](testInput.input);
	return [result, (result === testInput.expectation)] ;
}

myProgram.run(inputs);