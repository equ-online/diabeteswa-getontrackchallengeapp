define([
       'underscore',
       'backbone',
		'data',
		'moment',
       'text!templates/chatdetails.html'
], function (_, Backbone, data, moment, tmpl) {
	var ChatDetailsView = Backbone.View.extend({

		template: _.template(tmpl),

		render: function () {

			var dfd = new jQuery.Deferred();
			var self = this;

			data.query('GetMessageDetails', {messageId: this.options.messageId}).done(function (data) {
				$(self.el).html(self.template({message: data.message, comments: data.comments }));

				$('.post-comment-open').on('vclick', function () {
					$( '#popup-comment' ).popup( 'open' )
					return false;
				});
				
				$('.post-comment-reply').on('vclick', function () {
					postComment(self.options.messageId);
					return false;
				});

				dfd.resolve(self);
			});

			return dfd.promise();
		},
		initialize: function (attrs) {
			this.options = attrs;
		}
	});
	return ChatDetailsView;

	function postComment(messageId) {
		data.query('PostComment', {messageId: messageId, comment: $('#comment-reply').val()}).done(function () {
			data.clearCache('GetMessageDetails',{messageId: messageId});
			Backbone.history.fragment = null;
			Backbone.history.navigate(document.location.hash, true);
		});
	}
});