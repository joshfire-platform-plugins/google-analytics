/**
 * @fileoverview Appends the right script before the end of the <head> tag
 *
 * TODO: config location on page
 */
define([], function () {
  return function (runtime, params, callback) {
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