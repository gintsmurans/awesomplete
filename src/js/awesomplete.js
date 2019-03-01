/**
 * Simple, lightweight, usable local autocomplete library for modern browsers
 * Because there weren’t enough autocomplete scripts in the world?
 * Because I’m completely insane and have NIH syndrome? Probably both. :P
 * @author Lea Verou http://leaverou.github.io/awesomplete
 * MIT license
 */

/** Class representing a single Suggesstion. */
class Suggestion {
    constructor(data) {
        let o = { label: 'Unknown data', value: 'Unknown data' };
        if (typeof data === 'string') {
            o = { label: data, value: data };
        } else if (Array.isArray(data)) {
            o = { label: data[0], value: data[1] };
        } else if (typeof data === 'object' && ('label' in data || 'value' in data)) {
            o = data;
        }

        this.label = o.label || o.value;
        this.value = o.value;

        if ('userData' in o) {
            this.userData = o.userData;
        }
    }

    get length() {
        return this.label.length;
    }

    toString() {
        return `${this.label}`;
    }

    valueOf() {
        return this.toString();
    }
}

/** Class representing Awesomplete. */
export default class Awesomplete {
    constructor(input, o) {
        Awesomplete.all = [];
        const me = this;

        // Keep track of number of instances for unique IDs
        Awesomplete.count = (Awesomplete.count || 0) + 1;
        this.count = Awesomplete.count;

        // Setup
        this.isOpened = false;

        this.input = Awesomplete.query(input);
        this.input.setAttribute('autocomplete', 'off');
        this.input.setAttribute('aria-owns', `awesomplete_list_${this.count}`);
        this.input.setAttribute('role', 'combobox');

        // store constructor options in case we need to distinguish
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
            tabSelect: false,
        }, o);

        this.index = -1;

        // Create necessary elements

        this.container = this.container(input);

        this.ul = Awesomplete.create('ul', {
            hidden: 'hidden',
            role: 'listbox',
            id: `awesomplete_list_${this.count}`,
            inside: this.container,
        });

        this.status = Awesomplete.create('span', {
            className: 'visually-hidden',
            role: 'status',
            'aria-live': 'assertive',
            'aria-atomic': true,
            inside: this.container,
            textContent: this.minChars !== 0 ? (`Type ${this.minChars} or more characters for results.`) : 'Begin typing for results.',
        });

        // Bind events

        this.events = {
            input: {
                input: this.evaluate.bind(this),
                blur: this.close.bind(this, { reason: 'blur' }),
                keydown(evt) {
                    const c = evt.keyCode;

                    // If the dropdown `ul` is in view, then act on keydown for the following keys:
                    // Enter / Esc / Up / Down
                    if (me.opened) {
                        if (c === 13 && me.selected) { // Enter
                            evt.preventDefault();
                            me.select();
                        } else if (c === 9 && me.selected && me.tabSelect) {
                            me.select();
                        } else if (c === 27) { // Esc
                            me.close({ reason: 'esc' });
                        } else if (c === 38 || c === 40) { // Down/Up arrow
                            evt.preventDefault();
                            me[c === 38 ? 'previous' : 'next']();
                        }
                    }
                },
            },
            form: {
                submit: this.close.bind(this, { reason: 'submit' }),
            },
            ul: {
                // Prevent the default mousedowm, which ensures the input is not blurred.
                // The actual selection will happen on click. This also ensures dragging the
                // cursor away from the list item will cancel the selection
                mousedown(evt) {
                    evt.preventDefault();
                },

                // The click event is fired even if the corresponding mousedown event has called
                // preventDefault
                click(evt) {
                    let li = evt.target;

                    if (li !== this) {
                        while (li && !/li/i.test(li.nodeName)) {
                            li = li.parentNode;
                        }

                        if (li && evt.button === 0) { // Only select on left click
                            evt.preventDefault();
                            me.select(li, evt.target);
                        }
                    }
                },
            },
        };

        Awesomplete.bind(this.input, this.events.input);
        Awesomplete.bind(this.input.form, this.events.form);
        Awesomplete.bind(this.ul, this.events.ul);

        if (this.input.hasAttribute('list')) {
            this.list = `#${this.input.getAttribute('list')}`;
            this.input.removeAttribute('list');
        } else {
            this.list = this.input.getAttribute('data-list') || o.list || [];
        }

        Awesomplete.all.push(this);
    }

    configure(properties, o) {
        const iterFn = (i) => {
            const initial = properties[i];
            const attrValue = this.input.getAttribute(`data-${i.toLowerCase()}`);

            if (typeof initial === 'number') {
                this[i] = parseInt(attrValue, 10);
            } else if (initial === false) { // Boolean options must be false by default anyway
                this[i] = attrValue !== null;
            } else if (initial instanceof Function) {
                this[i] = null;
            } else {
                this[i] = attrValue;
            }

            if (!this[i] && this[i] !== 0) {
                this[i] = (i in o) ? o[i] : initial;
            }
        };
        Object.keys(properties).forEach(iterFn);
    }

    set list(list) {
        if (Array.isArray(list)) {
            this.dataList = list;
        } else if (typeof list === 'string' && list.indexOf(',') > -1) {
            this.dataList = list.split(/\s*,\s*/);
        } else { // Element or CSS selector
            const queriedList = Awesomplete.query(list);

            if (queriedList && queriedList.children) {
                const items = [];
                const iterFn = (el) => {
                    if (!el.disabled) {
                        const text = el.textContent.trim();
                        const value = el.value || text;
                        const label = el.label || text;
                        if (value !== '') {
                            items.push({ label, value });
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
    }

    get list() {
        return this.dataList;
    }

    get selected() {
        return this.index > -1;
    }

    get opened() {
        return this.isOpened;
    }

    close(o) {
        if (!this.opened) {
            return;
        }

        this.ul.setAttribute('hidden', '');
        this.isOpened = false;
        this.index = -1;

        this.status.setAttribute('hidden', '');

        Awesomplete.fire(this.input, 'awesomplete-close', o || {});
    }

    open() {
        this.ul.removeAttribute('hidden');
        this.isOpened = true;

        this.status.removeAttribute('hidden');

        if (this.autoFirst && this.index === -1) {
            this.goto(0);
        }

        Awesomplete.fire(this.input, 'awesomplete-open');
    }

    destroy() {
        // remove events from the input and its form
        Awesomplete.unbind(this.input, this.events.input);
        Awesomplete.unbind(this.input.form, this.events.form);

        // cleanup container if it was created by Awesomplete but leave it alone otherwise
        if (!this.options.container) {
            // move the input out of the awesomplete container and remove the container and
            // its children
            const { parentNode } = this.container;

            parentNode.insertBefore(this.input, this.container);
            parentNode.removeChild(this.container);
        }

        // remove autocomplete and aria-autocomplete attributes
        this.input.removeAttribute('autocomplete');
        this.input.removeAttribute('aria-autocomplete');

        // remove this awesomeplete instance from the global array of instances
        const indexOfAwesomplete = Awesomplete.all.indexOf(this);

        if (indexOfAwesomplete !== -1) {
            Awesomplete.all.splice(indexOfAwesomplete, 1);
        }
    }

    next() {
        const count = this.ul.children.length;
        let index = 0;
        if (this.index < count - 1) {
            index = this.index + 1;
        } else if (count) {
            index = 0;
        } else {
            index = -1;
        }
        this.goto(index);
    }

    previous() {
        const count = this.ul.children.length;
        const pos = this.index - 1;

        this.goto(this.selected && pos !== -1 ? pos : count - 1);
    }

    // Should not be used, highlights specific item without any checks!
    goto(i) {
        const lis = this.ul.children;

        if (this.selected) {
            lis[this.index].setAttribute('aria-selected', 'false');
        }

        this.index = i;

        if (i > -1 && lis.length > 0) {
            lis[i].setAttribute('aria-selected', 'true');

            this.status.textContent = `${lis[i].textContent}, list item ${(i + 1)} of ${lis.length}`;

            this.input.setAttribute('aria-activedescendant', `${this.ul.id}_item_${this.index}`);

            // scroll to highlighted element in case parent's height is fixed
            this.ul.scrollTop = lis[i].offsetTop - this.ul.clientHeight + lis[i].clientHeight;

            Awesomplete.fire(this.input, 'awesomplete-highlight', {
                text: this.suggestions[this.index],
            });
        }
    }

    select(selected, origin) {
        let selectedItem = selected;
        if (selected) {
            this.index = Awesomplete.siblingIndex(selected);
        } else {
            selectedItem = this.ul.children[this.index];
        }

        if (selectedItem) {
            const suggestion = this.suggestions[this.index];
            const selectedIndex = this.index;

            const allowed = Awesomplete.fire(this.input, 'awesomplete-select', {
                text: `${suggestion}`,
                selectedIndex,
                selectedSuggestion: suggestion,
                origin: origin || selectedItem,
            });

            if (allowed) {
                this.replace(suggestion);
                this.close({ reason: 'select' });
                Awesomplete.fire(this.input, 'awesomplete-selectcomplete', {
                    text: `${suggestion}`,
                    selectedIndex,
                    selectedSuggestion: suggestion,
                });
            }
        }
    }

    evaluate() {
        const me = this;
        const { value } = this.input;

        if (value.length >= this.minChars && this.dataList && this.dataList.length > 0) {
            this.index = -1;
            // Populate list with options that match
            this.ul.innerHTML = '';

            const mapFn = function (item) {
                return new Suggestion(me.data(item, value));
            };
            const filterFn = function (item) {
                return me.filter(item, value);
            };
            this.suggestions = this.dataList
                .map(mapFn)
                .filter(filterFn);

            if (this.sort !== false) {
                this.suggestions = this.suggestions.sort(this.sort);
            }

            this.suggestions = this.suggestions.slice(0, this.maxItems);

            const appendFn = function (text, index) {
                me.ul.appendChild(me.item(text, value, index));
            };
            this.suggestions.forEach(appendFn);

            if (this.ul.children.length === 0) {
                this.status.textContent = 'No results found';

                this.close({ reason: 'nomatches' });
            } else {
                this.open();

                this.status.textContent = `${this.ul.children.length} results found`;
            }
        } else {
            this.close({ reason: 'nomatches' });

            this.status.textContent = 'No results found';
        }
    }

    // Mark: Static methods/properties

    static FILTER_CONTAINS(text, input) {
        return RegExp(Awesomplete.regExpEscape(input.trim()), 'i').test(text);
    }

    static FILTER_STARTSWITH(text, input) {
        return RegExp(`^${Awesomplete.regExpEscape(input.trim())}`, 'i').test(text);
    }

    static SORT_BYLENGTH(a, b) {
        if (a.length !== b.length) {
            return a.length - b.length;
        }

        return a < b ? -1 : 1;
    }

    static CONTAINER(input) {
        return Awesomplete.create('div', {
            className: 'awesomplete',
            around: input,
        });
    }

    static ITEM(text, input, itemId) {
        const html = input.trim() === '' ? text : (`${text}`).replace(RegExp(Awesomplete.regExpEscape(input.trim()), 'gi'), '<mark>$&</mark>');
        return Awesomplete.create('li', {
            innerHTML: html,
            'aria-selected': 'false',
            id: `awesomplete_list_${this.count}_item_${itemId}`,
        });
    }

    static REPLACE(text) {
        this.input.value = text.value || text.label;
    }

    static DATA(item/* , input */) {
        return item;
    }

    // Helpers

    static query(expr, con) {
        return typeof expr === 'string' ? (con || document).querySelector(expr) : expr || null;
    }

    static queryAll(expr, con) {
        return Array.prototype.slice.call((con || document).querySelectorAll(expr));
    }

    static create(tag, o) {
        const element = document.createElement(tag);
        const iterFn = function (i) {
            const val = o[i];

            if (i === 'inside') {
                Awesomplete.query(val).appendChild(element);
            } else if (i === 'around') {
                const ref = Awesomplete.query(val);
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

    static bind(element, o) {
        if (element) {
            const iterFn = function (cKey) {
                const callback = o[cKey];
                const eventIterFn = function (event) {
                    element.addEventListener(event, callback);
                };
                cKey.split(/\s+/).forEach(eventIterFn);
            };
            Object.keys(o).forEach(iterFn);
        }
    }

    static unbind(element, o) {
        if (element) {
            const iterFn = function (cKey) {
                const callback = o[cKey];
                const eventIterFn = function (event) {
                    element.removeEventListener(event, callback);
                };
                cKey.split(/\s+/).forEach(eventIterFn);
            };
            Object.keys(o).forEach(iterFn);
        }
    }

    static fire(target, type, properties) {
        const evt = document.createEvent('HTMLEvents');
        const iterFn = function (j) {
            evt[j] = properties[j];
        };
        evt.initEvent(type, true, true);
        if (typeof properties === 'object') {
            Object.keys(properties).forEach(iterFn);
        }

        return target.dispatchEvent(evt);
    }

    static regExpEscape(s) {
        return s.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    static siblingIndex(el) {
        let i = 0;
        let testEl = el;
        while (testEl) {
            testEl = testEl.previousElementSibling;
            i += 1;
        }

        return i;
    }
}
