(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Clappr"));
	else if(typeof define === 'function' && define.amd)
		define(["Clappr"], factory);
	else if(typeof exports === 'object')
		exports["DailymotionPlayback"] = factory(require("Clappr"));
	else
		root["DailymotionPlayback"] = factory(root["Clappr"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _createClass=(function(){function defineProperties(target,props){for(var i=0;i < props.length;i++) {var descriptor=props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if('value' in descriptor)descriptor.writable = true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};})();var _get=function get(_x,_x2,_x3){var _again=true;_function: while(_again) {var object=_x,property=_x2,receiver=_x3;desc = parent = getter = undefined;_again = false;if(object === null)object = Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc === undefined){var parent=Object.getPrototypeOf(object);if(parent === null){return undefined;}else {_x = parent;_x2 = property;_x3 = receiver;_again = true;continue _function;}}else if('value' in desc){return desc.value;}else {var getter=desc.get;if(getter === undefined){return undefined;}return getter.call(receiver);}}};function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _clappr=__webpack_require__(1);var _dailymotionHtml=__webpack_require__(2);var _dailymotionHtml2=_interopRequireDefault(_dailymotionHtml);var _templateJs=__webpack_require__(3);var _templateJs2=_interopRequireDefault(_templateJs);__webpack_require__(4);var DailymotionPlayback=(function(_Playback){_inherits(DailymotionPlayback,_Playback);_createClass(DailymotionPlayback,[{key:'name',get:function get(){return 'dailymotion';}},{key:'template_gen',get:function get(){return (0,_templateJs2['default'])(_dailymotionHtml2['default']);}},{key:'attributes',get:function get(){return {'data-dailymotion-playback':'','class':'clappr-dailymotion-playback',id:this.cid};}}]);function DailymotionPlayback(options){_classCallCheck(this,DailymotionPlayback);_get(Object.getPrototypeOf(DailymotionPlayback.prototype),'constructor',this).call(this,options);this.options = options;this.settings = {seekEnabled:true,left:['playpause','position','duration'],'default':['seekbar'],right:['fullscreen','volume','hd-indicator']};_clappr.Mediator.on(_clappr.Events.PLAYER_RESIZE,this.updateSize,this);}_createClass(DailymotionPlayback,[{key:'setupDailymotionPlayer',value:function setupDailymotionPlayer(){if(window.DM && window.DM.Player){this.embedDailymotionPlayer();}else {this.embedDailymotionApiScript();}}},{key:'embedDailymotionApiScript',value:function embedDailymotionApiScript(){var _this=this;if(document.getElementsByTagName('script')[0].src !== 'http://api.dmcdn.net/all.js'){var e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('async','async');e.setAttribute('src','http://api.dmcdn.net/all.js');var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(e,s);window.players = [];}window.players.push(this);window.dmAsyncInit = function(){return _this.AsyncExec();}; // document.body.appendChild(script)
	}},{key:'AsyncExec',value:function AsyncExec(){for(var i in window.players) {window.players[i].embedDailymotionPlayer();}}},{key:'embedDailymotionPlayer',value:function embedDailymotionPlayer(){var _this2=this;var playerVars={id:'dm' + this.cid,api:'postMessage',chromeless:1,wmode:'opaque',logo:0,info:0};DM.init();var src_id=isDailymotionSrc(this.options.src);this.player = new DM.player('dm' + this.cid,{video:src_id,autoplay:1,params:playerVars,events:{apiready:function apiready(){return _this2.ready();},timeupdate:function timeupdate(){return _this2.timeupdate();},ended:function ended(){return _this2.stateStop();},playing:function playing(){return _this2.statePlaying();},progress:function progress(){return _this2.progress();}}});}},{key:'updateSize',value:function updateSize(){this.player && this.player.setSize(this.$el.width(),this.$el.height());}},{key:'ready',value:function ready(event){this._ready = true;this.trigger(_clappr.Events.PLAYBACK_READY);}},{key:'qualityChange',value:function qualityChange(event){this.trigger(_clappr.Events.PLAYBACK_HIGHDEFINITIONUPDATE);}},{key:'statePlaying',value:function statePlaying(){this.enableMediaControl();this.trigger(_clappr.Events.PLAYBACK_PLAY);}},{key:'stateStop',value:function stateStop(){this.trigger(_clappr.Events.PLAYBACK_ENDED);}},{key:'play',value:function play(){if(this._ready){ // this._progressTimer = this._progressTimer || setInterval(() => this.progress(), 100)
	this.playing = true;this.player.togglePlay(); // this.player.play()
	this.trigger(_clappr.Events.PLAYBACK_PLAY);this.trigger(_clappr.Events.PLAYBACK_BUFFERFULL);}else {this.listenToOnce(this,_clappr.Events.PLAYBACK_READY,this.play);}}},{key:'pause',value:function pause(){this.playing = false;this.player.togglePlay(); // this.player.pause()
	this.trigger(_clappr.Events.PLAYBACK_PAUSE);}},{key:'seek',value:function seek(position){if(!this.player)return;this.player.seek(this.player.duration / 100 * position);}},{key:'volume',value:function volume(value){this.player && this.player.setVolume(value / 100);}},{key:'progress',value:function progress(){var buffered=this.player.bufferedTime;this.trigger(_clappr.Events.PLAYBACK_PROGRESS,0,buffered,this.player.duration);}},{key:'timeupdate',value:function timeupdate(){this.playing = true;var buffered=this.player.bufferedTime;this.trigger(_clappr.Events.PLAYBACK_PROGRESS,0,buffered,this.player.duration);this.trigger(_clappr.Events.PLAYBACK_TIMEUPDATE,this.player.currentTime,this.player.duration);}},{key:'isPlaying',value:function isPlaying(){return this.player && this.playing;}},{key:'isHighDefinitionInUse',value:function isHighDefinitionInUse(){return this.player && !!this.player.getPlaybackQuality().match(/^hd\d+/);}},{key:'getDuration',value:function getDuration(){var duration=0;if(this.player){duration = this.player.duration;}return duration;}},{key:'disableMediaControl',value:function disableMediaControl(){this.$el.css({'pointer-events':'auto'});this.trigger(_clappr.Events.PLAYBACK_MEDIACONTROL_DISABLE);}},{key:'enableMediaControl',value:function enableMediaControl(){this.$el.css({'pointer-events':'none'});this.trigger(_clappr.Events.PLAYBACK_MEDIACONTROL_ENABLE);}},{key:'render',value:function render(){var templateOptions={id:'dm' + this.cid};this.$el.html(this.template_gen(templateOptions));this.setupDailymotionPlayer();return this;}}]);return DailymotionPlayback;})(_clappr.Playback);exports['default'] = DailymotionPlayback;DailymotionPlayback.canPlay = function(source){var result=isDailymotionSrc(source);if(result !== null){return true;}else {return false;}};var isDailymotionSrc=function isDailymotionSrc(source){var regExp=/^.+dailymotion.com\/((video|hub)\/([^_]+))?[^#]*(#video=([^_&]+))?/;var result=source.match(regExp);return result?result[5] || result[3]:null;};module.exports = window.DailymotionPlayback = DailymotionPlayback;module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "<div data-dailymotion id=\"<%=id%>\" style=\"pointer-events: none; position: absolute; height: 100%; width: 100%; display: block;\"></div>";

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Simple JavaScript Templating
	// Paul Miller (http://paulmillr.com)
	// http://underscorejs.org
	"use strict";(function(globals){ // By default, Underscore uses ERB-style template delimiters, change the
	// following template settings to use alternative delimiters.
	var settings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g}; // When customizing `templateSettings`, if you don't want to define an
	// interpolation, evaluation or escaping regex, we need one that is
	// guaranteed not to match.
	var noMatch=/(.)^/; // Certain characters need to be escaped so that they can be put into a
	// string literal.
	var escapes={"'":"'",'\\':'\\','\r':'r','\n':'n','\t':'t',"\u2028":'u2028',"\u2029":'u2029'};var escaper=/\\|'|\r|\n|\t|\u2028|\u2029/g; // List of HTML entities for escaping.
	var htmlEntities={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;'};var entityRe=new RegExp('[&<>"\']','g');var escapeExpr=function escapeExpr(string){if(string == null)return '';return ('' + string).replace(entityRe,function(match){return htmlEntities[match];});};var counter=0; // JavaScript micro-templating, similar to John Resig's implementation.
	// Underscore templating handles arbitrary delimiters, preserves whitespace,
	// and correctly escapes quotes within interpolated code.
	var tmpl=function tmpl(text,data){var render; // Combine delimiters into one regular expression via alternation.
	var matcher=new RegExp([(settings.escape || noMatch).source,(settings.interpolate || noMatch).source,(settings.evaluate || noMatch).source].join('|') + '|$','g'); // Compile the template source, escaping string literals appropriately.
	var index=0;var source="__p+='";text.replace(matcher,function(match,escape,interpolate,evaluate,offset){source += text.slice(index,offset).replace(escaper,function(match){return '\\' + escapes[match];});if(escape){source += "'+\n((__t=(" + escape + "))==null?'':escapeExpr(__t))+\n'";}if(interpolate){source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";}if(evaluate){source += "';\n" + evaluate + "\n__p+='";}index = offset + match.length;return match;});source += "';\n"; // If a variable is not specified, place data values in local scope.
	if(!settings.variable)source = 'with(obj||{}){\n' + source + '}\n';source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n//# sourceURL=/microtemplates/source[" + counter++ + "]";try{render = new Function(settings.variable || 'obj','escapeExpr',source);}catch(e) {e.source = source;throw e;}if(data)return render(data,escapeExpr);var template=function template(data){return render.call(this,data,escapeExpr);}; // Provide the compiled function source as a convenience for precompilation.
	template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';return template;};tmpl.settings = settings;if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return tmpl;}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // RequireJS
	}else if(typeof module !== 'undefined' && module.exports){module.exports = tmpl; // CommonJS
	}else {globals.microtemplate = tmpl; // <script>
	}})(undefined); // (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./dailymotion.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./dailymotion.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, ".clappr-dailymotion-playback[data-dailymotion-playback] {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  display: block;\n  pointer-events: none;\n}", ""]);

	// exports


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/ // css base code, injected by the css-loader
	"use strict";module.exports = function(){var list=[]; // return the list of modules as css string
	list.toString = function toString(){var result=[];for(var i=0;i < this.length;i++) {var item=this[i];if(item[2]){result.push("@media " + item[2] + "{" + item[1] + "}");}else {result.push(item[1]);}}return result.join("");}; // import a list of modules into the list
	list.i = function(modules,mediaQuery){if(typeof modules === "string")modules = [[null,modules,""]];var alreadyImportedModules={};for(var i=0;i < this.length;i++) {var id=this[i][0];if(typeof id === "number")alreadyImportedModules[id] = true;}for(i = 0;i < modules.length;i++) {var item=modules[i]; // skip already imported module
	// this implementation is not 100% perfect for weird media query combinations
	//  when a module is imported multiple times with different media queries.
	//  I hope this will never occur (Hey this way we have smaller bundles)
	if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]){if(mediaQuery && !item[2]){item[2] = mediaQuery;}else if(mediaQuery){item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";}list.push(item);}}};return list;};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ])
});
;