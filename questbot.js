console.log('The bot is questing!');

//------------------------INCLUDES--------------------------

var fs = require('fs');
// var readline = require('readline');
// var google = require('googleapis');
// var googleAuth = require('google-auth-library');
// const drive = google.drive({ version: 'v4'});
var Twit = require('twit');
var config = require('./config');
var fs = require('fs');
var parse = require('./text_parser');
var T = new Twit(config);

//------------------------TEXT PARSING--------------------------


//----- Read in text file and make arrays
var textSets = new Array();
var rawInputText = fs.readFileSync("./RAW_DATA/raw_data.txt", 'utf-8'); 	// <------------------ Replace arrays with objects
var textByLine = rawInputText.split("\n");						// <------------------ so you can refer to them
for (var i = 0; i < textByLine.length; i++){
	if (textByLine[i].substring(0,1) == '$'){
		var newArrayName = textByLine[i].substring(1,textByLine[i].length);
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
	}

}

//----- Generate a random string using the arrays created above



setInterval(makeAndPost, 1000*60*60*18);


function makeAndPost(){
	var aRawString = textSets[0][Math.floor(Math.random() * textSets[0].length)];
	aRawString = parse.branchedString(aRawString);
	console.log(aRawString);
	tweetIt(aRawString);	
}

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

//searchTwitter('from:@spookymeggie', 5);

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

//------------------------POSTING TO TWITTER--------------------------
/*
function tweetIt2(theTweet){
	var tweet = {
		status: theTweet
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
		var json = JSON.stringify(data,null,2);
		fs.writeFile("tweet.json", json);
		console.log(data);
		if (err) {
			console.log("Something went wrong!");
		} else {
			console.log("It worked!");
		}
	}
}*/

function tweetIt(theTweet){
	var tweet = {
		status: theTweet
	}

	var tweetChunk = {
		status: null
	}

	if (tweet.status.length > 140){
		var chop = 0;
		for (var i = 0; i < tweet.status.length; i++){
			if ((i-chop > 50 && (tweet.status.substring(i,i+1) == '!' ||tweet.status.substring(i,i+1) == '?' ||tweet.status.substring(i,i+1) == '.' ||tweet.status.substring(i,i+1) == ';')) || i-chop >= 140){
				tweetChunk.status = tweet.status.substring(chop, i+1);
				chop = i+1;
				T.post('statuses/update', tweetChunk, tweeted);
				console.log(tweetChunk.status + ' ' + tweetChunk.length);
				console.log('');
			} else if (i+1 == tweet.status.length){
				tweetChunk.status = tweet.status.substring(chop, i+1);
				console.log(tweetChunk.status + ' ' + tweetChunk.length);
			}
			if (tweet.status.substring(chop, chop+ 1) == ' ') {
				chop++;
			}
		}
	} else {
		T.post('statuses/update', tweet, tweeted);
		console.log(tweet.status + ' ' + tweet.status.length);
	}

	function tweeted(err, data, response) {
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
