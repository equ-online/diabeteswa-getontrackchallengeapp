define("data", ['jquery'], function ($) {
	var baseUrl = "http://getontrackchallenge.staging.equ.com.au/Base/Api/";

	var data = {};

	function clearCache(method) {
		localStorage.removeItem(method);
		localStorage.removeItem(method + 'cachettl');
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

		if (method != 'Login') {
			url += '/' + localStorage['accessToken'];
		}

		if (arguments.length > 1) {
			for (var i = 1; i < arguments.length; i++) {
				url += '/' + arguments[i];
				cacheKey += arguments[i];
			}
		}

		var dfd = new jQuery.Deferred();
		
		$.mobile.showPageLoadingMsg();

		$.ajax({
			localCache: true,

			cacheTTL: 0.08,
			cacheKey: cacheKey,
			url: url,
			cache: false,
			dataType: 'json',
			success: function (reply) {
				if (reply.Success == false) {
					clearCache(cacheKey);
					switch (reply.Data) {
						case 'notloggedin':
							clearAll();
							window.location.hash = 'login';
							break;
					
						case 'challengenotstarted':
						case 'notinchallenge':
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
			error: function(){
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



