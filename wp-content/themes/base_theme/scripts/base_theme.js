(function($) {

	$.fn.siteHead = function() {
		var elem = $(this),
			settings = {
				activeClass: 'is-active'
			};

		var init = function() {
            
			settings = $.extend(true, {}, settings, elem.parseSettings());

			var navTrigger = $('.site-head .js-toggle__trigger'),
				navElem = $('.site-head__nav');

			navTrigger.on('click', function(){

				if(navElem.hasClass('is-active')){
					
                    $('body').addClass('is-locked');
					
				} else {
					
					$('body').removeClass('is-locked');
					
                }

            });

            $('.menu-item-has-children a').click(function(e) {
                if(navElem.hasClass('is-active')){
                    e.preventDefault();
                }
            });

            $('.search__icon').click(function(){
                $('.search').toggleClass('search--open');
            });
              


			// This is a stub module. Go ahead and delete it if you don't need it
		};

		init();
		return this;
	};

}(jQuery));
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
/*------------------------------------*\
 CENTRAL APP MASTER
 
 This file includes the module placeholders system that allows modular
 binding of custom methods / plugins etc.
 
 EXAMPLE
 
 <div data-module="example1,example2"></div>
 
 The above would meet two conditions in the below switch statement.
 
 \*------------------------------------*/
var app = (function ($) {
	
	// This method will run when the DOM is ready. 
	var init = function () {
		
		// Find any module placeholders 
		var modulePlaceholders = $('[data-module]');
		
		if (modulePlaceholders.any()) {
			
			// Loop each placeholder
			modulePlaceholders.each(function () {
				
				var elem    = $(this),
				    modules = elem.attr('data-module');
				
				// If any modules found	
				if (modules) {
					
					// Split on the comma 
					modules = modules.split(',');
					
					// Loop each module key
					$.each(modules, function (i, module) {
						
						// Run switch to bind each module to each key
						switch (module) {
							
							// This is an example. Delete when you add your own cases.
							case 'site-head':
								
								elem.siteHead();
								break;
							
							case 'toggle':
								
								elem.toggle();
								break;
							
						}
						
					});
				}
			});
		}
		
		// Delete this line. This is just for letting you know that everything is fine on first load.
		console.log('Let\'s Go!!! Fun time!!!');
	};
	
	return {
		init: init
	}
	
}(window.jQuery));

// RUN!!
app.init();
//# sourceMappingURL=base_theme.js.map
