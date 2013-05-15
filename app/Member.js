define(['data'], function (data) {
	var member = {};
	member.IsLoggedIn = false;

	member.getCurrentMember = function () {
		return data.query("GetCurrentMember");
	};

	member.login = function (username, password) {
		return data.query("Login", username, password);
	};

	return member;
});