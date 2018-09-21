'use strict';
const NodeHelper = require('node_helper');

const PythonShell = require('python-shell');
var pythonStarted = false

module.exports = NodeHelper.create({

 	python_start: function () {
		const self = this;
//    		const pyshell = new PythonShell('modules/' + this.name + '/camera_publisher/image_webcam_broadcaster.py', { mode: 'json', args: [JSON.stringify(this.config)]});
    		const pyshell = new PythonShell('modules/' + this.name + '/camera_publisher/image_realsense_broadcaster.py', {pythonPath: 'python3', mode: 'json', args: [JSON.stringify(this.config)]});

    		pyshell.on('message', function (message) {
			try {
				//console.log("[MSG " + self.name + "] " + message);
      				if (message.hasOwnProperty('status')){
      					console.log("[" + self.name + "] " + message.status);
      				}
			}
			catch(err) {
				console.log("[" + self.name + "] " + err );
			}
    		});

    		pyshell.end(function (err) {
      			if (err) throw err;
      			console.log("[" + self.name + "] " + 'finished running...');
    		});
  },

  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    if(notification === 'CONFIG') {
      this.config = payload
      if(!pythonStarted) {
        pythonStarted = true;
        this.python_start();
	this.hidden = true;
        };
    };
  }

});
