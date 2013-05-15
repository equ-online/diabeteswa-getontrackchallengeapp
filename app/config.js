require.config({
    deps : ["main"],
    paths : {
        libs : "../lib",
		backbone : "../lib/backbone-min",
		underscore : "../lib/underscore-min",
		jquery : "../lib/jquery-1.9.1.min",
		jquerymobile : "../lib/jquery.mobile-1.3.0.min",
		text : "../lib/text",
        moment : "../lib/moment.min",
        jqueryajaxlocalstoragecache: "../lib/jquery-ajax-localstorage-cache"
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		data: {
			deps: ["jquery", "jqueryajaxlocalstoragecache"]
		}
	}
});