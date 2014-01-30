define("data", ['jquery'], function ($) {
    var baseUrl = "http://getontrackchallenge.com.au/Base/Api/";

    var data = {};

    function clearCache(method) {
		var cacheKey = method;
        if (arguments.length > 1) {
            cacheKey += JSON.stringify(arguments[1]);
        }
		clearCacheByKey(cacheKey);
    }
	
	function clearCacheByKey(key) {
        localStorage.removeItem(key);
        localStorage.removeItem(key + 'cachettl');
    }


	function clearAllButLogin() {
		var token = localStorage['accessToken'];
		localStorage.clear();
		localStorage['accessToken'] = token;
	}
	
    function clearAll() {
        localStorage.clear();
        Backbone.history.fragment = null;
        Backbone.history.navigate(document.location.hash, true);
    }

    function query(method) {
        var url = baseUrl + method;
        var cacheKey = method;
        var params = {};
        if (method != 'Login') {
            url += '/' + localStorage['accessToken'];
        }

        if (arguments.length > 1) {
            params = arguments[1];
            cacheKey += JSON.stringify(arguments[1]);
        }

        var dfd = new jQuery.Deferred();

        $.mobile.showPageLoadingMsg();

        $.ajax({
            localCache: true,
            data: params,
            cacheTTL: 0.08,
            cacheKey: cacheKey,
            url: url,
            cache: false,
            dataType: 'json',
            success: function (reply) {
                if (reply.Success == false) {
                    clearCacheByKey(cacheKey);
                    switch (reply.Data) {
                        case 'notloggedin':
                            clearAll();
                            window.location.hash = 'login';
                            break;

                        case 'challengenotstarted':
                        case 'notinchallenge':
                        case 'questionnairenotcompleted':
                            window.location.hash = reply.Data;
                            break;
                    }


                    dfd.reject();

                }
                else {

                    dfd.resolve(reply.Data);
                }
                $.mobile.hidePageLoadingMsg();
            },
            error: function () {
                clearAll();
                window.location.hash = 'login';
            }
        });

        return dfd.promise();
    }

    return {
        query: query,
        clearCache: clearCache,
        clearAll: clearAll,
		clearAllButLogin: clearAllButLogin
    };
});



