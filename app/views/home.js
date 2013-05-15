define([
       'underscore',
       'backbone',
		'data',
       'text!templates/home.html'
], function (_, Backbone, data, tmpl) {

	var HomeView = Backbone.View.extend({

		template: _.template(tmpl),

		render: function (eventName) {
			var self = this;
			var dfd = new jQuery.Deferred();

			data.query('GetCurrentChallenge').done(function (challenge) {
				$(self.el).html(self.template({ challenge: challenge }));
				dfd.resolve(self);
			});

			return dfd.promise();
		}
	});
	return HomeView;
});