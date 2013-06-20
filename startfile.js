/**
 * @fileoverview Appends the right script before the end of the <head> tag
 *
 * TODO: config location on page
 */
define([], function () {


  var getPluginInitContent = function (params) {

    return params.content.replace(/<\/body>/i,
      '<script type="text/javascript">\n'+
      '(function () {' +
        'var onDeviceReady = function () {' +
          'var permission = window.localStorage.getItem(\'google-analytics-permission\');' +
          '/* Note: A request for permission is REQUIRED by google. */' +
          'if ( permission === \'ok\') {' +
            'permissionCallback(1);' +
          '} else if (permission === \'nok\') {' +
            'permissionCallback(-1);' +
          '} else {' +
            'navigator.notification.confirm(\''+ params.config.app.name + ' would like your permission to collect usage data. No personal or user identifiable data will be collected.\', permissionCallback, \'Attention\', \'Allow,Deny\');' +
          '}' +
        '};' +

        'var permissionCallback = function (button) {' +
          'if (button === 1) {' +
            'window.localStorage.setItem(\'google-analytics-permission\', \'ok\');' +
            'window.plugins.gaPlugin.init(function (result) {' +
              'window.console.log(\'Google Analytics, Initialization result, \' + result);' +
            '}, function (error) {' +
              'window.console.error(\'Google Analytics\', \'Initialization error\', error);' +
            '}, \'' + params.options.accountid + '\', 10);' +
          '} else {' +
            'window.localStorage.setItem(\'google-analytics-permission\', \'nok\');' +
          '}' +
        '};' +

        'Joshfire.factory.onReady(onDeviceReady);' +
      '})();\n' +
      '</script></body>');
  };

  var getScriptInitContent = function (params) {
    return params.content.replace(/<\/head>/i,
          '<script type="text/javascript">' +
            'var _gaq = _gaq || [];' +
            '_gaq.push([\'_setAccount\', \'' + params.options.accountid + '\']);' +
            '_gaq.push([\'_trackPageview\']);' +

            '(function() {' +
              'var ga = document.createElement(\'script\');' +
              'ga.type = \'text/javascript\';' +
              'ga.async = true;' +
              'ga.src = (\'https:\' == document.location.protocol ? \'https://ssl\' : \'http://www\') + \'.google-analytics.com/ga.js\';' +
              'var s = document.getElementsByTagName(\'script\')[0]; s.parentNode.insertBefore(ga, s);' +
            '})();' +
          '</script></head>');
  };

  return function (runtime, params, callback) {
    var options = params.options;
    if ( !options || !options.accountid) {
      return callback(null, params.content);
    }

    var deploy = params.deploy;
    // In order to insert the script, we need to make sure:
    // - that an accountid has been provided,
    // - that we are not running the plugin in a ios/android cordova
    //   environment, in which case we will use the native plugin.
    if ( deploy && deploy.flags && !deploy.flags.web && deploy.flags.cordova &&
          ( deploy.flags.ios === true ||
            deploy.flags.android === true ))
    {
      return callback(null, getPluginInitContent(params));
    }

    return callback(null, getScriptInitContent(params));
  };
});
