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
			
			$('.public-post-open').on('vclick', function () {
				$( '#popup-public-post' ).popup( 'open' )
				return false;
			});
			$('.post-public-post').on('vclick', function () {
				postGlobalMessage(self.options.messageId);
				return false;
			});
			
			$('.team-post-open').on('vclick', function () {
				$( '#popup-team-post' ).popup( 'open' )
				return false;
			});
			$('.post-team-post').on('vclick', function () {
				postTeamMessage(self.options.messageId);
				return false;
			});

			return dfd.promise();
		}
	});
	return HomeView;
	
	function postGlobalMessage(messageId) {
		data.query('PostGlobalMessage', $('#public-post').val()).done(function () {
			data.clearCache('GetChatList');
			Backbone.history.fragment = null;
			Backbone.history.navigate(document.location.hash, true);
		});
	}
	
	function postTeamMessage(messageId) {
		data.query('PostTeamMessage', $('#team-post').val()).done(function () {
			data.clearCache('GetChatList');
			Backbone.history.fragment = null;
			Backbone.history.navigate(document.location.hash, true);
		});
	}
});