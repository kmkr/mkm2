/*
*
* jRails ajax extras
* version 0.1
* <aaron@ennerchi.com> | http://www.ennerchi.com
*
*/

(function($) {
	$.ajaxSettings.accepts._default = "text/javascript, text/html, application/xml, text/xml, */*";
})(jQuery);


/*
*
* jRails form extras
* <aaron@ennerchi.com> | http://www.ennerchi.com
*
*/


(function($) {
	// reset a form
	$.fn.reset = function() {
		return this.each(function() {
			// guard against an input with the name of 'reset'
			// note that IE reports the reset function as an 'object'
			if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType))
				this.reset();
		});
	};
	// enable a form element
	$.fn.enable = function() {
		return this.each(function() {
			this.disabled = false;
		});
	};
	// disable a form element
	$.fn.disable = function() {
		return this.each(function() {
			this.disabled = true;
		});
	};

})(jQuery);

/*
*
* jRails form observer plugin
* version 0.2
* <aaron@ennerchi.com> | http://www.ennerchi.com
*
*/

(function($) {
	$.extend({ // Translate field to event
		fieldEvent: function(el, obs) {
			var field = el[0] || el, e = 'change';
			if (field.type == 'radio' || field.type == 'checkbox') e = 'click';
			else if (obs && (field.type == 'text' || field.type == 'textarea' || field.type == 'password')) e = 'keyup';
			return e;
		}
	});
	$.fn.extend({ // Delayed observer for fields and forms
		delayedObserver: function(delay, callback){
			var el = $(this);
			if (typeof window.delayedObserverStack == 'undefined') window.delayedObserverStack = [];
			if (typeof window.delayedObserverCallback == 'undefined') {
				window.delayedObserverCallback = function(stackPos) {
					var observed = window.delayedObserverStack[stackPos];
					if (observed.timer) clearTimeout(observed.timer);
					observed.timer = setTimeout(function(){
						observed.timer = null;
						observed.callback(observed.obj, observed.obj.formVal());
					}, observed.delay * 1000);
					observed.oldVal = observed.obj.formVal();
				};
			}
			window.delayedObserverStack.push({
				obj: el, timer: null, delay: delay,
				oldVal: el.formVal(), callback: callback
			});
			var stackPos = window.delayedObserverStack.length-1;
			if (el[0].tagName == 'FORM') {
				$(':input', el).each(function(){
					var field = $(this);
					field.bind($.fieldEvent(field, delay), function(){
						var observed = window.delayedObserverStack[stackPos];
						if (observed.obj.formVal() == observed.oldVal) return;
						else window.delayedObserverCallback(stackPos);
					});
				});
			} else {
				el.bind($.fieldEvent(el, delay), function(){
					var observed = window.delayedObserverStack[stackPos];
					if (observed.obj.formVal() == observed.oldVal) return;
					else window.delayedObserverCallback(stackPos);
				});
			};
		},
		formVal: function() { // Gets form values
			var el = this[0];
			if(el.tagName == 'FORM') return this.serialize();
			if(el.type == 'checkbox' || el.type == 'radio') return this.filter('input:checked').val() || '';
			else return this.val();
		}
	});
})(jQuery);

/*
*
* jRails visual effects stubs
* version 0.2
* <aaron@ennerchi.com> | http://www.ennerchi.com
*
*/

(function($) {
	$.fn.extend({
		visualEffect : function(o, options) {
			if (options) {
        speed = options.duration * 1000;
      } else {
        speed = null;
      }
			e = o.replace(/\_(.)/g, function(m, l){return l.toUpperCase()});
			return eval('$(this).'+e+'('+ speed + ')');
		},
		appearP : function(speed, callback) {
			return this.fadeIn(speed, callback);
		},
		blindDownP : function(speed, callback) {
			return this.show('blind', { direction: 'vertical' }, speed, callback);
		},
		blindUpP : function(speed, callback) {
			return this.hide('blind', { direction: 'vertical' }, speed, callback);
		},
		blindRightP : function(speed, callback) {
			return this.show('blind', { direction: 'horizontal' }, speed, callback);
		},
		blindLeftP : function(speed, callback) {
			this.hide('blind', { direction: 'horizontal' }, speed, callback);
			return this;
		},
		dropOutP : function(speed, callback) {
			return this.hide('drop', {direction: 'down' }, speed, callback);
		},
		dropInP : function(speed, callback) {
			return this.show('drop', { direction: 'up' }, speed, callback);
		},
		fadeP : function(speed, callback) {
			return this.fadeOut(speed, callback);
		},
		fadeToggleP : function(speed, callback) {
			return this.animate({opacity: 'toggle'}, speed, callback);
		},
		foldP : function(speed, callback) {
			return this.hide('fold', {}, speed, callback);
		},
		foldOutP : function(speed, callback) {
			return this.show('fold', {}, speed, callback);
		},
		growP : function(speed, callback) {
			return this.show('scale', {}, speed, callback);
		},
		highlightP : function(speed, callback) {
			return this.show('highlight', {}, speed, callback);
		},
		puffP : function(speed, callback) {
			return this.hide('puff', {}, speed, callback);
		},
		pulsateP : function(speed, callback) {
			return this.show('pulsate', {}, speed, callback);
		},
		shakeP : function(speed, callback) {
			return this.show('shake', {}, speed, callback);
		},
		shrinkP : function(speed, callback) {
			return this.hide('scale', {}, speed, callback);
		},
		squishP : function(speed, callback) {
			return this.hide('scale', { origin: ['top', 'left'] }, speed, callback);
		},
		slideUpP : function(speed, callback) {
			return this.hide('slide', { direction: 'up'}, speed, callback);
		},
		slideDownP : function(speed, callback) {
			return this.show('slide', { direction: 'up'}, speed, callback);
		},
		switchOffP : function(speed, callback) {
			return this.hide('clip', {}, speed, callback);
		},
		switchOnP : function(speed, callback) {
			return this.show('clip', {}, speed, callback);
		}
	});
})(jQuery);
