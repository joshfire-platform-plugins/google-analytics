define(['woodman'], function (woodman) {

  return function (runtime, params, callback) {
    var logger = woodman.getLogger('add-on google-analytics injectCordovaPluginJS');
    logger.log('started');

    var jsFilePath = './GAPlugin/www/GAPlugin.js';

    /**
     * wrap JS file in IIFE and append it to cordova in bootstrap
     *
     * @function
     * @param {function} cb Callback
     */
    runtime.injectJS(jsFilePath, function (err) {
      if (err) {
        logger.warn('injectJS error', err);
      } else {
        logger.log('done');
      }

      callback(err);
      return;
    });

  };
});