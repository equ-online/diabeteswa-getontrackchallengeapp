define([
       'underscore',
       'backbone',
	   'data',
       'text!templates/notinchallenge.html'
], function (_, Backbone, data, tmpl) {
	var HomeView = Backbone.View.extend({
		template: _.template(tmpl),

		render: function (eventName) {
			var dfd = new jQuery.Deferred();
			var self = this;

			$(self.el).data('no-footer', true);
			$(self.el).html(self.template());
			dfd.resolve(self);

			return dfd.promise();
		}
	});
	return HomeView;
});