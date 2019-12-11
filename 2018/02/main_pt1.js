const fs = require('fs'),
	// input = fs.readFileSync('data.txt').toString().split('\n'); 
	input = [
	'ubkfmdjxyzlbgkrotcepvswaqx',
	'uikfmdkuyzlbgerotcepvswaqh',
	'uikfmdpxyzlbgnrotcepvswoeh'
	],
	checksum={}; 

input.forEach(function(element){
	checksum.duplicates += checkDuplicates(element);
	checksum.triplicates += checkTriplicates(element);
});

function checkDuplicates(element){
	
}

function checkTriplicates(element){

}


console.log('frequency: ' + frequency);
