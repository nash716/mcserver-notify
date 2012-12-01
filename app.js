var fs = require('fs'),
    mc = require('./mc');

try {
	var settings = JSON.parse(fs.readFileSync('settings.json'));
} catch(e) {
	console.log('settings.json not found or invalid.');
	process.exit(1);
}

try {
	settings = mc.config(settings);
} catch(e) {
	console.log('settings.json is not valid.\nError:\n', e);
	process.exit(1);
}

mc.startWatch(settings);

//var watcher = fs.watch('')