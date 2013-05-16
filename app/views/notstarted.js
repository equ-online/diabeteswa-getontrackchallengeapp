define([
       'underscore',
       'backbone',
	   'data',
       'text!templates/notstarted.html'
], function (_, Backbone, data, tmpl) {
	var HomeView = Backbone.View.extend({
		template: _.template(tmpl),

		render: function (eventName) {
			var dfd = new jQuery.Deferred();
			var self = this;

			$(self.el).data('no-footer', true);
			
			data.query('GetChallengeStartDate').done(function (challengeDetails) {
				$(self.el).html(self.template({challengeDetails: challengeDetails}));
				dfd.resolve(self);
			});
			
			
			
			return dfd.promise();
		}
	});
	return HomeView;
});