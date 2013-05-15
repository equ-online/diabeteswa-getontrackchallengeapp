define([
       'underscore',
       'backbone',
	   'data',
		'moment',
       'text!templates/loglist.html'
], function (_, Backbone, data, moment, tmpl) {

	var HomeView = Backbone.View.extend({
		template: _.template(tmpl),

		render: function (eventName) {

			var dfd = new jQuery.Deferred();
			var self = this;

			data.query('GetActivityToComplete').done(function (activityList) {
				$(self.el).html(self.template({ activityList: activityList }));
				dfd.resolve(self);
			});

			return dfd.promise();
		}
	});
	return HomeView;
});