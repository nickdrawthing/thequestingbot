var fs = require('fs');
var https = require('https');
var googleapis = require('googleapis'),
	JWT = googleapis.auth.JWT,
	drive = googleapis.drive('v2');
	analytics = googleapis.analytics('v3');

var SERVICE_ACCOUNT_EMAIL = 'questing-bot@hazel-thunder-160220.iam.gserviceaccount.com';
var SERVICE_ACCOUNT_KEY_FILE = './googleapi-privatekey.pem';

var authClient = new JWT(
	SERVICE_ACCOUNT_EMAIL,
	SERVICE_ACCOUNT_KEY_FILE,
	null,
	['https://www.googleapis.com/auth/drive']
);

authClient.authorize(function(err, tokens) {
	if (err) {
		console.log(err);
		return;
	} else {
		console.log('It authorized successfully!');

		drive.files.list({
			auth: authClient
		}, function(err,result){
			if (err) {
				console.log(err);
			} else {
				//console.log(result);
				var theID = result.items[0].id;
				console.log(theID);
				var fileName = result.items[0].originalFilename;
				console.log(fileName);
				var fileExt = result.items[0].fileExtension;
				if (fileExt == ''){
					fileExt = '.pdf';
				}
				console.log(fileExt);
				var dLUrl = result.items[0].downloadUrl
				console.log(dLUrl);
				
				var dest = fs.createWriteStream('./GS.pdf');
				drive.files.get({
					auth: authClient,
				   	fileId: theID,
				   	mimeType: 'application/pdf'
				})
				.on('end', function() {
				  	console.log('Done');
				})
				.on('error', function(err) {
				  	console.log('Error during download', err);
				})
				.pipe(dest);
				var fileNamePlusExtension = ('./' + fileName + fileExt);
				var file = fs.createWriteStream(fileNamePlusExtension);
				var request = https.get(dLUrl, function(response) {
					console.log('statusCode:', response.statusCode);
  					console.log('headers:', response.headers);
				  	response.pipe(file);

				  	response.on('data', (d) => {
				  		console.log(d);
				  	});
				}).on('error', (e) => {
					console.error(e);
				});
			}
		});

	}
});