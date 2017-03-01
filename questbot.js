console.log('The bot is questing!');

//------------------------INCLUDES--------------------------

var fs = require('fs');
var Twit = require('twit');
var config = require('./config');
var roster = require('./roster');
var parse = require('./text_parser');
var T = new Twit(config);

//------------------------TEXT PARSING--------------------------


//----- Read in text file and make arrays
var textSets = new Array();
var rawInputText = fs.readFileSync("./raw_data.txt", 'utf-8'); 	// <------------------ Replace arrays with objects
var textByLine = rawInputText.split("\n");						// <------------------ so you can refer to them
//console.log(textByLine);
for (var i = 0; i < textByLine.length; i++){
	if (textByLine[i].substring(0,1) == '$'){
		var newArrayName = textByLine[i].substring(1,textByLine[i].length);
//		console.log(newArrayName);
		global[newArrayName] = new Array();
		var jj = 0;
		var kk = 1;
		while (jj == 0){
			if (textByLine[i+kk] == '' || i+kk >= textByLine.length){
				jj = 1;
			} else {
				global[newArrayName].push(textByLine[i+kk]);
				kk++;
			}
		}
		textSets.push(global[newArrayName]);
		//console.log(global[newArrayName]);
	}

}

//----- Generate a random string using the arrays created above

//setInterval(makeAndPost, 1000*60*60*3);
setInterval(makeAndPost, 1000*5);

function makeAndPost(){
	//var incNumero = fs.readFileSync('./test', 'utf-8');
	//incNumero = parseInt(incNumero);
	var aRawString = textSets[0][Math.floor(Math.random() * textSets[0].length)];
	aRawString = parse.branchedString(aRawString);
	console.log(aRawString);
	console.log('');
	tweetIt(aRawString);	
	//incNumero++;
	// fs.writeFile("./test", incNumero, function(err) {
	// 	if (err) {
	// 		return console.log(err);
	// 	}

	// 	console.log("The file was saved!");
	// });
}
//*/

// for (xx = 0; xx < 5; xx++){
// 	var aRawString = raw.thingypoo[Math.floor(Math.random() * raw.thingypoo.length)];
// 	console.log(parse.branchedString(aRawString));
// }


//------------------------STREAMING--------------------------

var whatHash = {
	track: '#dnd'
}

// var stream = T.stream('statuses/filter', whatHash);
// stream.on('tweet', blessed)

function blessed(tweet){
	console.log(tweet.text)
}

//------------------------SEARCHING--------------------------

//searchTwitter('from:@POTUS', 5);

function searchTwitter(searchTerm, returnNum){
	var searchparams = {
		q: searchTerm,
		count: returnNum
	}

	T.get('search/tweets', searchparams, gotData);

	function gotData(err, data, response) {
		//console.log(data);
		var tweets = data.statuses;
		var twtlen = 0;
		var users = new Array();
		var constructuser = '';
		for (var i = 0; i < tweets.length; i++){
			users.length = 0;
			console.log('Tweet: "' + tweets[i].text + '"');
			twtlen = tweets[i].text.length;
			var recordflag = 0;
			for (k = 0; k < twtlen; k++){
				if (tweets[i].text.substring(k,k+1) == '@'){
					constructuser = '@';
					recordflag = 1;
				} else if (tweets[i].text.substring(k,k+1) == ' '){
					if (recordflag == 2){

						users.push(constructuser);
					}
					recordflag = 0;
				} 
				if (recordflag == 2){
					constructuser = constructuser.concat(tweets[i].text.substring(k,k+1))
				}
				if (recordflag == 1){
					recordflag = 2;
				}
			}
			console.log('Users: ' + users.length);
			for (var j = 0; j < users.length; j++){
				console.log(users[j]);
			}
			console.log('Tweet length: ' + twtlen + ' characters.');		
			console.log('');
			console.log(' ---');
			console.log('');
		}
	}
}

//------------------------POSTING--------------------------

function tweetIt(theTweet){
	var tweet = {
		status: theTweet
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
		var fs = require('fs');
		var json = JSON.stringify(data,null,2);
		fs.writeFile("tweet.json", json);
		console.log(data);
		if (err) {
			console.log("Something went wrong!");
		} else {
			console.log("It worked!");
		}
	}
}