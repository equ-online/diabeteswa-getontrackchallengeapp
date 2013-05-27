define([
       'underscore',
       'backbone',
		'data',
       'text!templates/home.html'
], function (_, Backbone, data, tmpl) {

	var HomeView = Backbone.View.extend({

		template: _.template(tmpl),

		render: function (eventName) {
			var dfd = new jQuery.Deferred();
			var self = this;

			data.query('GetCurrentChallenge').done(function (challenge) {
				$(self.el).html(self.template({ challenge: challenge }));
                $(self.el).find('.logout').click(function () {
	                data.clearAll();
	                return false;
	            });
				dfd.resolve(self);
			});

			return dfd.promise();
		}
	});
	return HomeView;
});