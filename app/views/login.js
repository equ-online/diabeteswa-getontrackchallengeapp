define([
       'underscore',
       'backbone',
	   'data',
       'text!templates/login.html'
], function (_, Backbone, data, tmpl) {

	var LoginView = Backbone.View.extend({
		template: _.template(tmpl),

		render: function (eventName) {
			localStorage.clear();
			var dfd = new jQuery.Deferred();
			var self = this;
			$(this.el).data('no-footer', true);
			$(this.el).html(this.template());
			setupEvent();
			dfd.resolve(self);
			return dfd.promise();
		}
	});
	return LoginView;

	function setupEvent() {
		$('.login-btn').on('vclick', function (event) {
			if( $('#username').val().length == 0 || $('#password').val().length == 0 )
			{
				$('.error-message').html('Username and password is required.');
			}
			else
			{
				data.query("Login", $('#username').val(), $('#password').val()).done(function (data) {
			
					if (data.length > 0) {
						localStorage['accessToken'] = data;
						window.location.hash = "";
					}
					else
					{
						$('.error-message').html('Error with username and password.');
					}
				}).fail(function(){
					$('.error-message').html('Error with username and password.');
				});
			}
			return false;
		});
	}
});