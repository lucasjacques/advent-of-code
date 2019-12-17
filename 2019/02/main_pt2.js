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

myProgram.findNounAndVerb = function(progAndResult) {
	// '1,3,3,0,99,2'
	/* What the code must do:
	 * 
	 * See a 1 which means its a sum
	 * Execute the first code line to modify the input
	 * Go to the next execution (+4 elements to the right)
	 * See a 99, which halts the program
	 * Analyse the info gathered in the previous code lines executed (in this case, only 1)
	 * See there's only one sum
	 * Analyse the last element of the array which is the expected output
	 * Execute the function to find the noun and verb, which will:
	 *     Look at the operators (element at position 0 and the next +4 positioned elements 
	 *       before the first 99 is encountered)
	 *     Look at the "result element" (in this case is in the position 0) of the last iteration
	 *       input (right before the hault is read) to measure the "distance" between the current
	 *       result and the one expected
	 *       If the distance is positive, means we have to add value to our noun and verb pair
	 *       If the distance is negative, means we have to remove value to our noun and verb pair
	 *     Modify the result element and run again to see if the distance is 0, if not, repeat the
	 *       previous steps
	 *     Actually, I guess it can be more assertive:
	 *        We can reconstruct the commands in algorithm, like:
	 *        For this example, it would be: 0 + 0, which results in 0
	 *        Since it has a diference between the expected result (2), we will have to change it
	 *          We have: the elements 1, 0, 99 to work with. Can they result in 2 through one sum?
	 *          In this case, yes, so we could have 1, 0, 0, 0, 99. So the algorithm stops and outputs
	 *          the 0,0 output
	 *        But if we could not? if it was 1,3,3,0,99,3, the elements 1, 0 and 99 wouldn't be enough
	 *          So we would need what I'll call right here as a "refer to itself" element in the pair
	 *          producing the value we need, it would result in 1,1,2,0,99 
	 *            (other possibilities 1,2,1,0,99 or 1,0,2,0,99) 
	 *            OBS: The "1,3,5,0,99,3" answer isn't correct for this program because we can only 
	 *            change the noun and verb, the 6th element cannot be changed.
	 */
	return '12,2';
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
		{
			fnTesting: 'findNounAndVerb',
			input: '2,12,2,0,1,0,9,0,99,1313,1337'.split(','),
			expectation: '12,2',
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