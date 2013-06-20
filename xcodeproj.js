define(['woodman'], function (woodman) {
  return function (runtime, params, callback) {

    var logger = woodman.getLogger('add-on', 'google-analytics', 'xcodeproj');
    logger.log('started');

    runtime.plugmanInstall('./GAPlugin', function (err) {
      if (err) {
        logger.error('plugmanInstall error', err);
      } else {
        logger.log('we DONE');
      }

      callback(err);
    });
  };
});