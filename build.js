// DEPRECATED (2012-07-12): to be removed once new add-ons system is up
module.exports = {
  "startfile":function(runtime,params,callback) {

    //TODO config location on page
    callback(null,params["content"].replace(/<\/head>/i,
      '<script type="text/javascript">'+
        'var _gaq = _gaq || [];'+
        "_gaq.push(['_setAccount', '"+params.options.accountid+"']);"+
        "_gaq.push(['_trackPageview']);"+

        "(function() {"+
          "var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;"+
          "ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';"+
          "var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);"+
        "})();"+
      "</script></head>"));
  }
};
