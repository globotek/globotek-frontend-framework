(function($) {

	$.fn.toggle = function() {
		var elem = $(this),
		    targets = elem.find('.js-toggle__target'),
		    triggers = elem.find('.js-toggle__trigger'),
		    settings = {
			    activeClass: 'is-active',
			    visibleClass: 'is-active',
			    elemClass: '',
			    elemClassAttribute: 'data-elem-class'
		    };

		var init = function() {

			    // Find elem class
			    if(elem.attr(settings.elemClassAttribute)) {
				    settings.elemClass = elem.attr(settings.elemClassAttribute);
                }
                

			    // Bind the click
			    triggers.off('click').on('click', function(evt) {

				    evt.preventDefault();

				    // Load trigger and target
				    var trigger = $(this),
				        target = targets.filter(trigger.attr('href')),
				        relatedTriggers = triggers.filter('[href="' + trigger.attr('href') + '"]');

				    // If there are multiple triggers targeting the same elem, just pass them all
				    // to the toggle method for class toggling
				    if(relatedTriggers.any()) {
					    trigger = relatedTriggers;
				    }

				    // Toggle menu state accordingly
				    if(trigger.hasClass(settings.activeClass)) {
					    toggle(trigger, target, 'off');
				    }
				    else {
					    toggle(trigger, target, 'on');
				    }

			    });
		    },

		    toggle = function(trigger, target, state) {

			    switch(state) {
				    case 'off':
				    default:
					    target.removeClass(settings.visibleClass);
					    trigger.removeClass(settings.activeClass);

					    if(settings.elemClass.length > 0) {
						    elem.removeClass(settings.elemClass);
					    }
					    break;
				    case 'on':
					    target.addClass(settings.visibleClass);
					    trigger.addClass(settings.activeClass);

					    if(settings.elemClass.length > 0) {
						    elem.addClass(settings.elemClass);
					    }
					    break;
			    }
		    };

		init();
		return this;
	};

}(jQuery));