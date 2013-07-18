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
          'if (window.plugins && window.plugins.gaPlugin) {' +
            'window.plugins.gaPlugin.init(function (result) {' +
              'window.console.log(\'Google Analytics, Initialization result\');' +
              'window.console.log(result);' +
              'window.plugins.gaPlugin.trackPage(function () {' +
                'window.console.log(\'Google Analytics, Start Page tracking OK\');' +
              '}, function (error) {' +
                'window.console.error(\'Google Analytics, Start Page tracking error:\');' +
                'window.console.error(error);' +
              '}, "start")' +
            '}, function (error) {' +
              'window.console.error(\'Google Analytics\', \'Initialization error\');' +
              'window.console.error(error);' +
            '}, \'' + params.options.accountid + '\', 10);' +
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
