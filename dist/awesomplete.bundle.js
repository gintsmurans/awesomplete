var Awesomplete =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/awesomplete.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/awesomplete.js":
/*!*******************************!*\
  !*** ./src/js/awesomplete.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Awesomplete; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Simple, lightweight, usable local autocomplete library for modern browsers
 * Because there weren’t enough autocomplete scripts in the world?
 * Because I’m completely insane and have NIH syndrome? Probably both. :P
 * @author Lea Verou http://leaverou.github.io/awesomplete
 * MIT license
 */

/** Class representing a single Suggesstion. */
var Suggestion =
/*#__PURE__*/
function () {
  function Suggestion(data) {
    _classCallCheck(this, Suggestion);

    var o = {
      label: 'Unknown data',
      value: 'Unknown data'
    };

    if (typeof data === 'string') {
      o = {
        label: data,
        value: data
      };
    } else if (Array.isArray(data)) {
      o = {
        label: data[0],
        value: data[1]
      };
    } else if (_typeof(data) === 'object' && ('label' in data || 'value' in data)) {
      o = data;
    }

    this.label = o.label || o.value;
    this.value = o.value;

    if ('userData' in o) {
      this.userData = o.userData;
    }
  }

  _createClass(Suggestion, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.label);
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.toString();
    }
  }, {
    key: "length",
    get: function get() {
      return this.label.length;
    }
  }]);

  return Suggestion;
}();
/** Class representing Awesomplete. */


var Awesomplete =
/*#__PURE__*/
function () {
  function Awesomplete(input, o) {
    _classCallCheck(this, Awesomplete);

    Awesomplete.all = [];
    var me = this; // Keep track of number of instances for unique IDs

    Awesomplete.count = (Awesomplete.count || 0) + 1;
    this.count = Awesomplete.count; // Setup

    this.isOpened = false;
    this.input = Awesomplete.query(input);
    this.input.setAttribute('autocomplete', 'off');
    this.input.setAttribute('aria-owns', "awesomplete_list_".concat(this.count));
    this.input.setAttribute('role', 'combobox'); // store constructor options in case we need to distinguish
    // between default and customized behavior later on

    this.options = o || {};
    this.configure({
      minChars: 2,
      maxItems: 10,
      autoFirst: false,
      data: Awesomplete.DATA,
      filter: Awesomplete.FILTER_CONTAINS,
      sort: o.sort === false ? false : Awesomplete.SORT_BYLENGTH,
      container: Awesomplete.CONTAINER,
      item: Awesomplete.ITEM,
      replace: Awesomplete.REPLACE,
      tabSelect: false
    }, o);
    this.index = -1; // Create necessary elements

    this.container = this.container(input);
    this.ul = Awesomplete.create('ul', {
      hidden: 'hidden',
      role: 'listbox',
      id: "awesomplete_list_".concat(this.count),
      inside: this.container
    });
    this.status = Awesomplete.create('span', {
      className: 'visually-hidden',
      role: 'status',
      'aria-live': 'assertive',
      'aria-atomic': true,
      inside: this.container,
      textContent: this.minChars !== 0 ? "Type ".concat(this.minChars, " or more characters for results.") : 'Begin typing for results.'
    }); // Bind events

    this.events = {
      input: {
        input: this.evaluate.bind(this),
        blur: this.close.bind(this, {
          reason: 'blur'
        }),
        keydown: function keydown(evt) {
          var c = evt.keyCode; // If the dropdown `ul` is in view, then act on keydown for the following keys:
          // Enter / Esc / Up / Down

          if (me.opened) {
            if (c === 13 && me.selected) {
              // Enter
              evt.preventDefault();
              me.select();
            } else if (c === 9 && me.selected && me.tabSelect) {
              me.select();
            } else if (c === 27) {
              // Esc
              me.close({
                reason: 'esc'
              });
            } else if (c === 38 || c === 40) {
              // Down/Up arrow
              evt.preventDefault();
              me[c === 38 ? 'previous' : 'next']();
            }
          }
        }
      },
      form: {
        submit: this.close.bind(this, {
          reason: 'submit'
        })
      },
      ul: {
        // Prevent the default mousedowm, which ensures the input is not blurred.
        // The actual selection will happen on click. This also ensures dragging the
        // cursor away from the list item will cancel the selection
        mousedown: function mousedown(evt) {
          evt.preventDefault();
        },
        // The click event is fired even if the corresponding mousedown event has called
        // preventDefault
        click: function click(evt) {
          var li = evt.target;

          if (li !== this) {
            while (li && !/li/i.test(li.nodeName)) {
              li = li.parentNode;
            }

            if (li && evt.button === 0) {
              // Only select on left click
              evt.preventDefault();
              me.select(li, evt.target);
            }
          }
        }
      }
    };
    Awesomplete.bind(this.input, this.events.input);
    Awesomplete.bind(this.input.form, this.events.form);
    Awesomplete.bind(this.ul, this.events.ul);

    if (this.input.hasAttribute('list')) {
      this.list = "#".concat(this.input.getAttribute('list'));
      this.input.removeAttribute('list');
    } else {
      this.list = this.input.getAttribute('data-list') || o.list || [];
    }

    Awesomplete.all.push(this);
  }

  _createClass(Awesomplete, [{
    key: "configure",
    value: function configure(properties, o) {
      var _this = this;

      var iterFn = function iterFn(i) {
        var initial = properties[i];

        var attrValue = _this.input.getAttribute("data-".concat(i.toLowerCase()));

        if (typeof initial === 'number') {
          _this[i] = parseInt(attrValue, 10);
        } else if (initial === false) {
          // Boolean options must be false by default anyway
          _this[i] = attrValue !== null;
        } else if (initial instanceof Function) {
          _this[i] = null;
        } else {
          _this[i] = attrValue;
        }

        if (!_this[i] && _this[i] !== 0) {
          _this[i] = i in o ? o[i] : initial;
        }
      };

      Object.keys(properties).forEach(iterFn);
    }
  }, {
    key: "close",
    value: function close(o) {
      if (!this.opened) {
        return;
      }

      this.ul.setAttribute('hidden', '');
      this.isOpened = false;
      this.index = -1;
      this.status.setAttribute('hidden', '');
      Awesomplete.fire(this.input, 'awesomplete-close', o || {});
    }
  }, {
    key: "open",
    value: function open() {
      this.ul.removeAttribute('hidden');
      this.isOpened = true;
      this.status.removeAttribute('hidden');

      if (this.autoFirst && this.index === -1) {
        this.goto(0);
      }

      Awesomplete.fire(this.input, 'awesomplete-open');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // remove events from the input and its form
      Awesomplete.unbind(this.input, this.events.input);
      Awesomplete.unbind(this.input.form, this.events.form); // cleanup container if it was created by Awesomplete but leave it alone otherwise

      if (!this.options.container) {
        // move the input out of the awesomplete container and remove the container and
        // its children
        var parentNode = this.container.parentNode;
        parentNode.insertBefore(this.input, this.container);
        parentNode.removeChild(this.container);
      } // remove autocomplete and aria-autocomplete attributes


      this.input.removeAttribute('autocomplete');
      this.input.removeAttribute('aria-autocomplete'); // remove this awesomeplete instance from the global array of instances

      var indexOfAwesomplete = Awesomplete.all.indexOf(this);

      if (indexOfAwesomplete !== -1) {
        Awesomplete.all.splice(indexOfAwesomplete, 1);
      }
    }
  }, {
    key: "next",
    value: function next() {
      var count = this.ul.children.length;
      var index = 0;

      if (this.index < count - 1) {
        index = this.index + 1;
      } else if (count) {
        index = 0;
      } else {
        index = -1;
      }

      this.goto(index);
    }
  }, {
    key: "previous",
    value: function previous() {
      var count = this.ul.children.length;
      var pos = this.index - 1;
      this.goto(this.selected && pos !== -1 ? pos : count - 1);
    } // Should not be used, highlights specific item without any checks!

  }, {
    key: "goto",
    value: function goto(i) {
      var lis = this.ul.children;

      if (this.selected) {
        lis[this.index].setAttribute('aria-selected', 'false');
      }

      this.index = i;

      if (i > -1 && lis.length > 0) {
        lis[i].setAttribute('aria-selected', 'true');
        this.status.textContent = "".concat(lis[i].textContent, ", list item ").concat(i + 1, " of ").concat(lis.length);
        this.input.setAttribute('aria-activedescendant', "".concat(this.ul.id, "_item_").concat(this.index)); // scroll to highlighted element in case parent's height is fixed

        this.ul.scrollTop = lis[i].offsetTop - this.ul.clientHeight + lis[i].clientHeight;
        Awesomplete.fire(this.input, 'awesomplete-highlight', {
          text: this.suggestions[this.index]
        });
      }
    }
  }, {
    key: "select",
    value: function select(selected, origin) {
      var selectedItem = selected;

      if (selected) {
        this.index = Awesomplete.siblingIndex(selected);
      } else {
        selectedItem = this.ul.children[this.index];
      }

      if (selectedItem) {
        var suggestion = this.suggestions[this.index];
        var selectedIndex = this.index;
        var allowed = Awesomplete.fire(this.input, 'awesomplete-select', {
          text: "".concat(suggestion),
          selectedIndex: selectedIndex,
          selectedSuggestion: suggestion,
          origin: origin || selectedItem
        });

        if (allowed) {
          this.replace(suggestion);
          this.close({
            reason: 'select'
          });
          Awesomplete.fire(this.input, 'awesomplete-selectcomplete', {
            text: "".concat(suggestion),
            selectedIndex: selectedIndex,
            selectedSuggestion: suggestion
          });
        }
      }
    }
  }, {
    key: "evaluate",
    value: function evaluate() {
      var me = this;
      var value = this.input.value;

      if (value.length >= this.minChars && this.dataList && this.dataList.length > 0) {
        this.index = -1; // Populate list with options that match

        this.ul.innerHTML = '';

        var mapFn = function mapFn(item) {
          return new Suggestion(me.data(item, value));
        };

        var filterFn = function filterFn(item) {
          return me.filter(item, value);
        };

        this.suggestions = this.dataList.map(mapFn).filter(filterFn);

        if (this.sort !== false) {
          this.suggestions = this.suggestions.sort(this.sort);
        }

        this.suggestions = this.suggestions.slice(0, this.maxItems);

        var appendFn = function appendFn(text, index) {
          me.ul.appendChild(me.item(text, value, index));
        };

        this.suggestions.forEach(appendFn);

        if (this.ul.children.length === 0) {
          this.status.textContent = 'No results found';
          this.close({
            reason: 'nomatches'
          });
        } else {
          this.open();
          this.status.textContent = "".concat(this.ul.children.length, " results found");
        }
      } else {
        this.close({
          reason: 'nomatches'
        });
        this.status.textContent = 'No results found';
      }
    } // Mark: Static methods/properties

  }, {
    key: "list",
    set: function set(list) {
      if (Array.isArray(list)) {
        this.dataList = list;
      } else if (typeof list === 'string' && list.indexOf(',') > -1) {
        this.dataList = list.split(/\s*,\s*/);
      } else {
        // Element or CSS selector
        var queriedList = Awesomplete.query(list);

        if (queriedList && queriedList.children) {
          var items = [];

          var iterFn = function iterFn(el) {
            if (!el.disabled) {
              var text = el.textContent.trim();
              var value = el.value || text;
              var label = el.label || text;

              if (value !== '') {
                items.push({
                  label: label,
                  value: value
                });
              }
            }
          };

          Array.prototype.slice.apply(queriedList.children).forEach(iterFn);
          this.dataList = items;
        }
      }

      if (document.activeElement === this.input) {
        this.evaluate();
      }
    },
    get: function get() {
      return this.dataList;
    }
  }, {
    key: "selected",
    get: function get() {
      return this.index > -1;
    }
  }, {
    key: "opened",
    get: function get() {
      return this.isOpened;
    }
  }], [{
    key: "FILTER_CONTAINS",
    value: function FILTER_CONTAINS(text, input) {
      return RegExp(Awesomplete.regExpEscape(input.trim()), 'i').test(text);
    }
  }, {
    key: "FILTER_STARTSWITH",
    value: function FILTER_STARTSWITH(text, input) {
      return RegExp("^".concat(Awesomplete.regExpEscape(input.trim())), 'i').test(text);
    }
  }, {
    key: "SORT_BYLENGTH",
    value: function SORT_BYLENGTH(a, b) {
      if (a.length !== b.length) {
        return a.length - b.length;
      }

      return a < b ? -1 : 1;
    }
  }, {
    key: "CONTAINER",
    value: function CONTAINER(input) {
      return Awesomplete.create('div', {
        className: 'awesomplete',
        around: input
      });
    }
  }, {
    key: "ITEM",
    value: function ITEM(text, input, itemId) {
      var html = input.trim() === '' ? text : "".concat(text).replace(RegExp(Awesomplete.regExpEscape(input.trim()), 'gi'), '<mark>$&</mark>');
      return Awesomplete.create('li', {
        innerHTML: html,
        'aria-selected': 'false',
        id: "awesomplete_list_".concat(this.count, "_item_").concat(itemId)
      });
    }
  }, {
    key: "REPLACE",
    value: function REPLACE(text) {
      this.input.value = text.value || text.label;
    }
  }, {
    key: "DATA",
    value: function DATA(item
    /* , input */
    ) {
      return item;
    } // Helpers

  }, {
    key: "query",
    value: function query(expr, con) {
      return typeof expr === 'string' ? (con || document).querySelector(expr) : expr || null;
    }
  }, {
    key: "queryAll",
    value: function queryAll(expr, con) {
      return Array.prototype.slice.call((con || document).querySelectorAll(expr));
    }
  }, {
    key: "create",
    value: function create(tag, o) {
      var element = document.createElement(tag);

      var iterFn = function iterFn(i) {
        var val = o[i];

        if (i === 'inside') {
          Awesomplete.query(val).appendChild(element);
        } else if (i === 'around') {
          var ref = Awesomplete.query(val);
          ref.parentNode.insertBefore(element, ref);
          element.appendChild(ref);

          if (ref.getAttribute('autofocus') != null) {
            ref.focus();
          }
        } else if (i in element) {
          element[i] = val;
        } else {
          element.setAttribute(i, val);
        }
      };

      Object.keys(o).forEach(iterFn);
      return element;
    }
  }, {
    key: "bind",
    value: function bind(element, o) {
      if (element) {
        var iterFn = function iterFn(cKey) {
          var callback = o[cKey];

          var eventIterFn = function eventIterFn(event) {
            element.addEventListener(event, callback);
          };

          cKey.split(/\s+/).forEach(eventIterFn);
        };

        Object.keys(o).forEach(iterFn);
      }
    }
  }, {
    key: "unbind",
    value: function unbind(element, o) {
      if (element) {
        var iterFn = function iterFn(cKey) {
          var callback = o[cKey];

          var eventIterFn = function eventIterFn(event) {
            element.removeEventListener(event, callback);
          };

          cKey.split(/\s+/).forEach(eventIterFn);
        };

        Object.keys(o).forEach(iterFn);
      }
    }
  }, {
    key: "fire",
    value: function fire(target, type, properties) {
      var evt = document.createEvent('HTMLEvents');

      var iterFn = function iterFn(j) {
        evt[j] = properties[j];
      };

      evt.initEvent(type, true, true);

      if (_typeof(properties) === 'object') {
        Object.keys(properties).forEach(iterFn);
      }

      return target.dispatchEvent(evt);
    }
  }, {
    key: "regExpEscape",
    value: function regExpEscape(s) {
      return s.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    }
  }, {
    key: "siblingIndex",
    value: function siblingIndex(el) {
      var i = 0;
      var testEl = el;

      while (testEl) {
        testEl = testEl.previousElementSibling;
        i += 1;
      }

      return i;
    }
  }]);

  return Awesomplete;
}();



/***/ })

/******/ })["default"];
//# sourceMappingURL=awesomplete.bundle.js.map