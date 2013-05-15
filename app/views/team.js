define([
       'underscore',
       'backbone',
	   'data',
       'text!templates/team.html'
], function (_, Backbone, data, tmpl) {
	var HomeView = Backbone.View.extend({
		template: _.template(tmpl),

		render: function (eventName) {
			var dfd = new jQuery.Deferred();
			var self = this;

			data.query('GetTeamInfo').done(function (team) {
				$(self.el).html(self.template({team:team}));
				dfd.resolve(self);
			});

			return dfd.promise();
		}
	});
	return HomeView;
});