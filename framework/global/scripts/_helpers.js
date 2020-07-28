(function ($) {

	/*------------------------------------*\
	    ANY

	    This will return true if there are any items
	    in a jQuery collection.

	    EXAMPLE

	    var items = $(".item");

	    if(items.any()) {
			console.log("YAY!");
		}
	\*------------------------------------*/

	$.fn.any = function () {
		return $(this).length > 0;
	};


	/*------------------------------------*\
		QUERY STRING

		A helper to work with query strings

		toJson: take the current query string and return it as json
		fromJson: takes a json object and converts into a query string

	\*------------------------------------*/

	$.extend({

		getUrlParams: function () {

			var response  = {},
			    data      = window.location.href.toString().toLowerCase(),
			    splitData = [];

			// Return empty object if undefined
			if (typeof (data) == 'undefined') {
				return {};
			}

			// Return empty object if empty
			if (data.length == 0) {
				return {};
			}

			// Set empty array if ignore keys not set
			if (typeof (ignoreKeys) == 'undefined') {
				ignoreKeys = [];
			}

			// Split query string into array
			queryParams = data.split('?')[1];

			if(queryParams) {

				splitData = queryParams.split('&');

				// Loop and create key value pairs
				for (var i = 0, l = splitData.length; i < l; i++) {
					var param = splitData[i].split('=');
					response[param[0]] = param[1];
				}

				// Check ignore keys length
				if (ignoreKeys.length > 0) {

					// Loop each one and delete if exists
					$.each(ignoreKeys, function (i, val) {

						if (response.hasOwnProperty(val)) {
							delete response[val];
						}
					});

				}

				return response;

			}

		}

	});

	/*------------------------------------*\
		ESC

		A useful little wrapper for the escape key press event

		EXAMPLE

		$.esc({
			callback: function(evt) {

				// Close your modal or whatever. Accessibility FTW
			}
		});

	\*------------------------------------*/
	$.extend({
		esc: function (options) {

			var settings = {
				callback: null
			}

			settings = $.extend(true, {}, settings, options);

			if (typeof (settings.callback) == 'function') {

				$(document).keyup(function (evt) {

					// escape key maps to keycode `27`
					if (evt.keyCode == 27) {

						// run callback and pass the event over
						settings.callback(evt);
					}
				});
			}

		}
	});

}(jQuery));

// TAKEN FROM David Walsh blog - http://davidwalsh.name/javascript-debounce-function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this, args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};