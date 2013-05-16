require([
		'domReady',
		'jquery',
		'underscore',
		'backbone',
		'views/login',
		'views/home',
		'views/loglist',
		'views/logadd',
		'views/team',
		'views/chatlist',
		'views/chatdetails',
		'views/notstarted',
		'views/notinchallenge',
		'jquerymobile'
	], function (domReady,$, _, Backbone, LoginView, HomeView, LogListView, LogAddView, TeamView, ChatView, ChatDetailsView, NotStartedView, NotInChallengeView) {
		 domReady(function () {
			function onDeviceReady(desktop) {
				$.mobile.linkBindingEnabled = false;
				$.mobile.hashListeningEnabled = false;
				$.mobile.defaultPageTransition = "none";

				var footerTemplate = _.template($('#main-footer').html());

				$(document).on('pagebeforecreate', "*[data-role='page']", function () {
					var page = $(this);
					if (page.data('no-footer') != true) {
						page.append(footerTemplate());
						page.find('#' + page.data('footer')).addClass('ui-btn-active');
					}

					$('.current-page').removeClass('current-page');
					page.addClass('current-page');
					$('.refresh-page').click(function () {
						Backbone.history.fragment = null;
						Backbone.history.navigate(document.location.hash, true);
						return false;
					});
				});

				$(document).on('pagehide', "*[data-role='page']", function () {
					var page = $(this);
					$('.ui-page').not('.current-page').remove();
					$('.ui-page.current-page').addClass('page-open');
				});

				var AppRouter = Backbone.Router.extend({
					routes: {
						"": "home",
						"home": "home",
						"login": "login",
						"log": "loglist",
						"log-:d": "logadd",
						"team": "team",
						"chat": "chat",
						"chat-:d": "chatdetails",
						'challengenotstarted': 'notstarted',
						'notinchallenge': 'notinchallenge'
					},
					home: function () {
						this.changePage(new HomeView(), 'home');
					},
					login: function () {
						doPageChange(new LoginView());
					},
					loglist: function () {
						this.changePage(new LogListView(), 'log-time');
					},
					logadd: function (d) {
						this.changePage(new LogAddView({ date: d }), 'log-time');
					},
					team: function () {
						this.changePage(new TeamView(), 'team');
					},
					chat: function () {
						this.changePage(new ChatView(), 'chat');
					},
					chatdetails: function (d) {
						this.changePage(new ChatDetailsView({ messageId: d }), 'chat');
					},
					notinchallenge: function () {
						this.changePage(new NotInChallengeView());
					},
					notstarted: function () {
						this.changePage(new NotStartedView());
					},
					changePage: function (page, footerClass) {
						if (localStorage['accessToken'] == null) {
							window.location.hash = "login";
						} else {
							doPageChange(page, footerClass);
						}
					}
				});


				function doPageChange(page, footerClass) {
					$('body').append($(page.el));
					$(page.el).attr('data-role', 'page');
					$(page.el).attr('data-theme', 'a');

					if (footerClass != undefined) {
						$(page.el).attr('data-footer', 'footer-nav-' + footerClass);
					}
					page.render().done(function () {
						var transition = $.mobile.defaultPageTransition;
						$.mobile.changePage($(page.el), { changeHash: false, transition: transition });

					});
				}

				$(function () {
					new AppRouter();
					Backbone.history.start({ pushState: false });
				});
			}
			
			if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
                // This is running on a device so waiting for deviceready event
                document.addEventListener('deviceready', onDeviceReady, false);
            } else {
                // On desktop don't have to wait for anything
                onDeviceReady(true);
            }
			
		});
	}
);