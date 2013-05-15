define([
       'underscore',
       'backbone',
		'data',
		'moment',
       'text!templates/logadd.html'
], function (_, Backbone, data, moment, tmpl) {
	var HomeView = Backbone.View.extend({

		template: _.template(tmpl),

		render: function () {

			var dfd = new jQuery.Deferred();
			var self = this;
			$(self.el).html(self.template({ date: moment(this.options.date) }));

			$('.log-time-btn').on('vclick', function (event) {
				event.stopPropagation();
				logTime(self.options.date);
				return false;
			});

			dfd.resolve(self);

			return dfd.promise();
		},
		initialize: function (attrs) {
			this.options = attrs;
		}
	});
	return HomeView;


	function logTime(date) {

		var fruitCount = $('#fruit').length;
		var vegCount = $('#veg').length;
		var minutes = parseFloat($('#minutes').val());
		var hours = parseFloat($('#hours').val());
		var intensity = parseFloat($('input[name=intensity]:checked').val());

		var totalMinues = (hours * 60) + minutes
		data.query('LogTime', intensity, totalMinues, fruitCount, vegCount, date).done(function () {
			data.clearCache('GetActivityToComplete');
			window.location.hash = '#log';
		});

	}
});