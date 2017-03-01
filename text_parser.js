module.exports = {
	branchedString: function (inputString){
		var stringParts = new Array();
		var finalString = '';
		var currentStringStart = 0;
		var bracketSize = 0;
		for (var i = 0; i < inputString.length; i++){
			if (inputString.substring(i,i+1) == '['){
				if ((i-currentStringStart) > 0){
					stringParts.push(inputString.substring(currentStringStart, i));
				}
				bracketSize = this.findSquareBraceEnd(i+1, inputString);
				var thisSubString = inputString.substring(i+1,i+bracketSize+1);
				var whatBrace = this.withinBraces(thisSubString);
				if (whatBrace == 0){
					var braceContents = this.getAnArrayValue(thisSubString);
				} else {
					var braceContents = this.inLineRandom(thisSubString);
				}
				stringParts.push(braceContents);
				currentStringStart = i + bracketSize + 2;
				i += bracketSize + 1;
			}
			if (i+1 == inputString.length){
				stringParts.push(inputString.substring(currentStringStart, i+1));
			}
		}
		for (var k = 0; k < stringParts.length; k++){
			finalString = finalString.concat(stringParts[k]);
		}
		return finalString;

	},

	findSquareBraceEnd: function (startPos, inString){
		var openBrackets = 1;
		var j = startPos;
		while (openBrackets > 0){
			if (inString.substring(j,j+1) == ']'){
				openBrackets--;
			}
			if (inString.substring(j,j+1) == '['){
				openBrackets++;
			}
			j++;
		}
		return ((j-1)-startPos);

	},

	withinBraces: function (inString){

		var noBars = 0;
		for (var i = 0; i < inString.length; i++){
			if (inString.substring(i, i+1) == '|'){
				noBars++;
			}
		}
		return noBars;
	},

	inLineRandom: function (inString){
		// Accepts a bar-divided in-line random set, turns it into an array, makes a random 
		// selection, parses it, then returns the result
		var randomOptions = new Array();
		var lnBreak = 0;
//		var bracketSize = 0;
		var braceScope = 0;
		for (var i = 0; i < inString.length; i++){
			if (i+1 == inString.length) {
				randomOptions.push(inString.substring(lnBreak,i+1));
				console.log(inString.substring(lnBreak,i+1));
				i++;
			} else if (inString.substring(i,i+1) == '['){
				braceScope++;
//				bracketSize = this.findSquareBraceEnd(i+1, inString);
//				var thisSubString = inString.substring(i,i+bracketSize+2);
//				/*var whatBrace = this.withinBraces(thisSubString);
//				if (whatBrace == 0){
//					var braceContents = this.getAnArrayValue(thisSubString);
//				} else {
//					var braceContents = this.inLineRandom(thisSubString);
//				}
//				console.log(braceContents);
//				randomOptions.push(braceContents);*/
//				//randomOptions.push(thisSubString);
//				console.log(thisSubString);
//				i += bracketSize + 1;
			} else if (inString.substring(i,i+1) == ']') {
				braceScope--;
			} else if (inString.substring(i,i+1) == '|' && braceScope == 0) {
				randomOptions.push(inString.substring(lnBreak,i));
				console.log(inString.substring(lnBreak,i));
				lnBreak = i+1;
			}
		}
		var randSelection = randomOptions[Math.floor(Math.random() * randomOptions.length)];
		randSelection = this.branchedString(randSelection);
		return randSelection;
	},

	getAnArrayValue: function (arrayName){
		// Accepts a string, checks to see if it's a valid array, then returns an item from that array
		var v = arrayName;
		if (global[arrayName]){
			var arr = global[arrayName];
			v = arr[Math.floor(Math.random() * arr.length)];
			v = this.branchedString(v);
		}
		return v;
	}
};
