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

			data.query('GetMessageDetails', this.options.messageId).done(function (comments) {
				$(self.el).html(self.template({ comments: comments }));

				
				
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
		data.query('PostComment', messageId, $('#comment-reply').val()).done(function () {
			data.clearCache('GetMessageDetails' + messageId);
			Backbone.history.fragment = null;
			Backbone.history.navigate(document.location.hash, true);
		});
	}
});