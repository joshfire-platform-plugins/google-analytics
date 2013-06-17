/**
 * @fileoverview Appends the right script before the end of the <head> tag
 *
 * TODO: config location on page
 */
define([], function () {
  return function (runtime, params, callback) {
    // In order to insert the script, we need to make sure:
    // - that an accountid has been provided,
    // - that we are not running the plugin in a ios/android cordova
    //   environment, in which case we will use the native plugin.
    if ( !params.options || !params.options.accountid ||
          (params.deploy && params.deploy.flags &&
            ( !params.deploy.flags.web ||
              params.deploy.flags.cordova &&
                ( params.deploy.flags.ios === true ||
                  params.deploy.flags.android === true ))))
    {
      return callback(null, params.content);
    }

    callback(null, params.content.replace(/<\/head>/i,
      '<script type="text/javascript">'+
        'var _gaq = _gaq || [];'+
        '_gaq.push([\'_setAccount\', \''+params.options.accountid+'\']);'+
        '_gaq.push([\'_trackPageview\']);'+

        '(function() {'+
          'var ga = document.createElement(\'script\'); ga.type = \'text/javascript\'; ga.async = true;'+
          'ga.src = (\'https:\' == document.location.protocol ? \'https://ssl\' : \'http://www\') + \'.google-analytics.com/ga.js\';'+
          'var s = document.getElementsByTagName(\'script\')[0]; s.parentNode.insertBefore(ga, s);'+
        '})();'+
      '</script></head>'));
  };
});