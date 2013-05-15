define([
       'underscore',
       'backbone',
	   'data',
       'text!templates/chatlist.html'
], function(_, Backbone, data, tmpl){

	var HomeView = Backbone.View.extend({
		template:_.template(tmpl),

		render:function (eventName) {
			var dfd = new jQuery.Deferred();
			var self = this;

			data.query('GetChatList').done(function (chatList) {
				$(self.el).html(self.template({ chatList: chatList }));
				dfd.resolve(self);
			});

			return dfd.promise();
		}
	});
	return HomeView;
});