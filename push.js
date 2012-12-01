module.exports = function(user, mes, callback) {
	var http = require('http'),
	    url = require('url'),
	    querystring = require('querystring');
	
	var parsedURL = url.parse('http://im.kayac.com/api/post/' + user),
	    body = { 
			message: mes
	    };

	var postData = querystring.stringify(body);

	var reqOptions = {
		host: parsedURL.host,
		port: 80,
		path: parsedURL.pathname,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': postData.length
		}
	};
	
	var req = http.request(reqOptions, function(res) {
		res.setEncoding('utf-8');
		res.on('data', function(data) {
			if (callback) {
				callback(data);
			}
		});
	});
	
	req.write(postData);
	req.end();
}