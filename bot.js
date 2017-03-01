console.log('The bot is running');

var Twit = require('twit');

var config = require('./config');
//console.log(config);
var T = new Twit(config);

var searchparams = {
	q: 'from:@spookymeggie',
	count: 5
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
};