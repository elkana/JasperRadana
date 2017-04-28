var exec = require('cordova/exec');

exports.echo = function(arg0, success, error) {
    exec(success, error, "JasperRadana", "echo", [arg0]);
};

exports.hitung = function(arg0, success, error) {
    exec(success, error, "JasperRadana", "hitung", [arg0]);
};

exports.printSample = function (url, reportName, successCallback, errorCallback) {    
    exec(successCallback, errorCallback, "JasperRadana", "printSample", [url, reportName]);

};
