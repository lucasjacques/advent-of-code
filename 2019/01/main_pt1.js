const fs = require('fs'),
	input = fs.readFileSync('data.txt').toString().split('\n'); 
const myProgram = {
	logs: { tests: '' },
};

myProgram.run = function(data) {
	let myIndex = 0;
	for (var i = data.length - 1; i >= 0; i--) {
		myIndex++;
	}
	myProgram.tests.run();
	console.log(myProgram.logs.tests);
}

myProgram.divideAndRoundDown = function(num) {
	return Math.floor(num / 3);
}


myProgram.test = {};
myProgram.test.toText = function(result, funcTesting, input, expectation) {
	if (result) {
		return `The test of ${funcTesting} function runned smoothly!`;
	}
	return `Oops! There was a problem during the test of ${funcTesting} function. We expected ${expectation}, but it resulted in ${myProgram[funcTesting](input)} !`;
};
myProgram.test.run = function(funcTesting, input, expectation) {
	return (myProgram[funcTesting](input) === expectation);
}


myProgram.tests = {};
myProgram.tests.run = function() {
	const testInputs = {
		funcTesting: 'divideAndRoundDown',
	}

	myProgram.logs.tests += "RUNNING TESTS \n";

	// tests used on the advent of code
	myProgram.logs.tests += myProgram.test.toText(myProgram.test.run('divideAndRoundDown', 12, 4), 'divideAndRoundDown', 12, 4) + '\n';
	// TODO myProgram.divideAndRoundDown(14);
	// TODO myProgram.divideAndRoundDown(1969);
	// TODO myProgram.divideAndRoundDown(100756);

	// TODO // one more for string data
	// TODO myProgram.divideAndRoundDown('12'));
	
	myProgram.logs.tests += "TESTS ENDED \n";	
}





myProgram.run(input);