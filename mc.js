var mc = { },
    fs = require('fs'),
    push = require('./push');

mc.config = function(config) {
	var isValid = true;

	isValid = isValid && fs.existsSync(config.logFile);
	isValid = isValid && config.users.length;

	for (var i=0; i<config.users.length; i++) {
		isValid = isValid && config.users[i].minecraft.length;
		isValid = isValid && config.users[i].kayac.length;
	}

	if (!isValid) throw { 
	    name:        'Config Error', 
	    message:     'Error detected.', 
	    htmlMessage: 'Error detected.' 
	};

	mc.conf = config;

	return config;
};

mc.startWatch = function(config) {
	mc.watcher = fs.watch(config.logFile, { persistent: true }, mc.listener);
};

mc.listener = function(event, filename) {
	if (event != 'change') return;

	var log = fs.readFileSync(mc.conf.logFile).toString();

	log = log.split('\n');

	if (log[log.length - 2].indexOf('disconnect.quitting') >= 0) {
		var user = log[log.length - 2].match(/\[INFO\]\s(\w+)\s/)[1];

		for (var i=0; i<mc.conf.users.length; i++) {
			if (mc.conf.users[i].minecraft == user) continue;

			push(mc.conf.users[i].kayac, user + ' has logged out from Minecraft Server.', mc.callback);
		}
	} else if (log[log.length - 2].indexOf('logged in with entity') >= 0) {
		var user = log[log.length - 2].match(/\[INFO\]\s(\w+)\[/)[1];

		for (var i=0; i<mc.conf.users.length; i++) {
			if (mc.conf.users[i].minecraft == user) continue;

			push(mc.conf.users[i].kayac, user + ' has logged in to Minecraft Server.', mc.callback);
		}
	}
};

mc.callback = function(data) {
	console.log(data);
};

module.exports = exports = mc;