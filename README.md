# JasperRadana

This cordova plugin is designed for Radana project to generate report. 

Compatible for Browser, Android and iOS.

Installation
------------
```
cordova plugin add https://github.com/elkana/JasperRadana
```

Usage
-----

```javascript
            cordova.plugins.JasperRadana.printSample(<url>,<report-name>,                
                function (msg) {                    
                       alert(msg);
                },
                function (err) {
                       console.log(err);
                }
		);
```
