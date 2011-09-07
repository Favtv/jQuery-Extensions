/**
 * jQuery Transition End
 *
 * Copyright (c) 2011 Shaun Harrison, Fav.tv
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * transitionEnd fires after a native CSS3 transition completes
 * A "fail safe" timeout interval is provided to fire the event after a
 * specified time if the browser fails to fire the event.
 * 
 * Due to it's "fail safe" feature, this only fires once, and then removes itself.
 * You'll need to register a callback each time your transition ends if you'd like to use it multiple times.
 *
 * @param	number	time out interval to wait for a native event to fire, before firing ourself (option, defaults to 600ms)
 * @param	function	callback function
 */
jQuery.fn.transitionEnd = function(failSafeTimeoutInterval, callbackFunction) {
	if(typeof failSafeTimeoutInterval == 'function') {
		callbackFunction = failSafeTimeoutInterval;
		failSafeTimeoutInterval = undefined;
	}

	failSafeTimeoutInterval = failSafeTimeoutInterval || 600;
	
	var failSafeUsed = false;
	var self = this;
	
	var failSafeTimeout = setTimeout(function() {
		failSafeUsed = true;
		callbackFunction.apply(self, arguments);
	}, failSafeTimeoutInterval);

	$(this).bind('transitionend webkitTransitionEnd OTransitionEnd msTransitionEnd', function(event) {
		if(!failSafeUsed) {
			callbackFunction.apply(self, arguments);
			clearTimeout(failSafeTimeout);
		}

	    $(this).unbind(event);
	});
};
