var fs = require('fs');
var https = require('https');
var googleapis = require('googleapis'),
	JWT = googleapis.auth.JWT,
	drive = googleapis.drive('v3');
	analytics = googleapis.analytics('v3');

var SERVICE_ACCOUNT_EMAIL = 'questing-bot@hazel-thunder-160220.iam.gserviceaccount.com';
var SERVICE_ACCOUNT_KEY_FILE = './googleapi-privatekey.pem';

var authClient = new JWT(
	SERVICE_ACCOUNT_EMAIL,
	SERVICE_ACCOUNT_KEY_FILE,
	null,
	['https://www.googleapis.com/auth/drive']

);

//------------ put a text file on Drive
// putFileOnDrive(authClient,'file0.txt','./RAW_DATA/file1.txt','text/plain');

function putFileOnDrive(auth,fileName,fileDir,mimeType){
	authClient.authorize(function(err, tokens) {
		if (err) {														// \
			console.log(err);											// /
			return;														// } ---  Authorization
		} else {														// \
			console.log('It authorized successfully!');					// /
			var fileMetadata = {
			  	'name': fileName
			};
			var media = {
			  	mimeType: mimeType,
			 	body: fs.createReadStream(fileDir)
			};
			drive.files.create({
				auth: authClient,
			   	resource: fileMetadata,
			   	media: media,
			   	fields: 'id'
			}, function(err, file) {
			  	if(err) {
			    	// Handle error
			    	console.log(err);
			  } else {
			    	console.log('File Id: ', file.id);
			  }
			});
	    }
	});
}


//------------ overwrite a file on drive

//updateDrive(authClient, '0Bxl3EBgaLl6mRFBDWEVBYmNBLUk', './RAW_DATA/file2.txt');

function updateDrive(auth,fileID,fileDir){
	auth.authorize(function(err, tokens) {
		if (err) {														
			console.log(err);											
			return;													
		} else {										
			console.log('It authorized successfully!');	
			var fileMetadata = {
				'fileId': fileID
			};	
			var media = {
			 	body: fs.createReadStream(fileDir)
			};
			drive.files.update({
				auth: auth,
				fileId: fileID,
			   	media: media
			   	fields: 'modifiedTime, id'
			}, function(err, file) {
			  	if(err) {
			    	console.log(err);
			  } else {
			    	console.log(file);
			  }
			});
	    }
	});
}




//------------ download a file from drive using the known file id

// dLFile('0Bxl3EBgaLl6mRFBDWEVBYmNBLUk', 'file.txt', '../Desktop/', authClient);

function dLFile(fileID, fileName, fileDir, auth){
	auth.authorize(function(err, tokens) {
	if (err) {
		console.log(err);
		return;	
	} else {
		console.log('It authorized successfully!');					
			var fileDest = fileDir + fileName;
			var dest = fs.createWriteStream(fileDest);
			drive.files.get({
				auth: auth,
				fileId: fileID,
				alt: 'media'
			})
			.on('end', function(fileDest){
				console.log('File saved at ' + fileDir + fileName);
			})
			.on('Error', function(err){
				console.log('Error during download', err);
			})
			.pipe(dest);
		}
	});
}


//------------ List all the files on Drive

// listFilesOnDrive(authClient);

function listFilesOnDrive(auth){
	auth.authorize(function(err, tokens) {
		if (err) {													
			console.log(err);										
			return;											
		} else {	
			console.log('It authorized successfully!');							
			drive.files.list({
				//q: "mimeType='image/jpeg'",
				auth: auth									
			}, function(err,result){	
				if (err) {				
					console.log(err);		
				} else {
					console.log(result.files.length);
					console.log(result);
				
			 	}
			});
		}
	});
}


//------------ delete all files on drive that fit a particular query

// scrubFiles("name = 'file0.txt'", authClient);
//scrubFiles(null, authClient);

function scrubFiles(searchTerms, auth){
	auth.authorize(function(err, tokens) {
		if (err) {
			console.log('Boo!');													
			console.log(err);										
			return;											
		} else {	
			console.log('Yay!');
			var whatFiles = {
				'auth': auth
			}
			if (searchTerms != null){
				whatFiles = {
					'auth': auth,
					'q': searchTerms
				}
			}
			drive.files.list(whatFiles, function(err,result){
				if (err) {
					console.log(err);
				} else {
					console.log(result);
					for (var i = 0; i < result.files.length; i++){
						console.log(result.files[i].name);
						drive.files.delete({'fileId': result.files[i].id, 'auth': auth}, function(err,result){
							if (err){
								console.log(err);
							} else {
								console.log('File deleted.');
							}
						});
					}
				}
			});
		}
	});
}
