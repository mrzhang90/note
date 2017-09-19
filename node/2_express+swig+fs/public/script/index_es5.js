'use strict';

function ajaxFn() {
	ajax().then(function (data) {
		console.log(data);
	});
}
function ajax() {
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: '/insert',
			data: { username: 123 },
			success: function success(data) {
				resolve(data);
			},
			error: function error(_error) {
				reject(_error);
			}
		});
	});
}
