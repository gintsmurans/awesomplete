# Awesomplete ES6 Module
[![npm version](https://img.shields.io/npm/v/awesomplete.svg)](https://www.npmjs.com/package/awesomplete-es6)
[![Build Status](https://img.shields.io/travis/gintsmurans/awesomplete-es6/gh-pages.svg)](https://travis-ci.org/gintsmurans/awesomplete-es6)
<!--- [![Code Climate](https://img.shields.io/codeclimate/github/gintsmurans/awesomplete-es6.svg)](https://codeclimate.com/github/gintsmurans/awesomplete-es6) --->
<!--- [![Test Coverage](https://img.shields.io/codeclimate/coverage/github/gintsmurans/awesomplete-es6.svg)](https://codeclimate.com/github/gintsmurans/awesomplete-es6/coverage) --->

https://gintsmurans.github.io/awesomplete-es6/

Awesomplete is an ultra lightweight, customizable, simple autocomplete widget with zero dependencies, built with modern standards for modern browsers.

## Installation
There are a few ways to obtain the needed files.
Here are 2 of them:

```sh
npm install awesomplete-es6 --save
```

More information about the npm package can be found [here](https://www.npmjs.com/package/awesomplete-es6).

## Basic Usage

```html
<input class="test-field"
       data-list="Ada, Java, JavaScript, Brainfuck, LOLCODE, Node.js, Ruby on Rails" />
```

```javascript
import Awesomplete from 'awesomplete-es6';
const settings = {
    minChars: 1,
    autoFirst: true,
    data: (item) => {
        const title = item.title;
        return { label: title, userData: item };
    },
};
const awesomplete = new Awesomplete($('.test-field')[0], settings);
```

There are many ways to link an input to a list of suggestions.
The simple example above could have also been made with the following markup, which provides a nice native fallback in case the script doesn’t load:

```html
<input class="test-field" list="mylist" />
<datalist id="mylist">
    <option>Ada</option>
    <option>Java</option>
    <option>JavaScript</option>
    <option>Brainfuck</option>
    <option>LOLCODE</option>
    <option>Node.js</option>
    <option>Ruby on Rails</option>
</datalist>
```

Or the following, if you don’t want to use a `<datalist>`, or if you don’t want to use IDs (since any selector will work in data-list):

```html
<input class="test-field" data-list="#mylist" />
<ul id="mylist">
    <li>Ada</li>
    <li>Java</li>
    <li>JavaScript</li>
    <li>Brainfuck</li>
    <li>LOLCODE</li>
    <li>Node.js</li>
    <li>Ruby on Rails</li>
</ul>
```

There are multiple customizations and properties able to be instantiated within the JS. Libraries and definitions of the properties are available in the Links below.

## License

Awesomplete is released under the MIT License. See [LICENSE][1] file for
details.

## Links

This is ES6 fork of the original library that can be found at <http://leaverou.github.io/awesomplete/>.

Documentation for the API and other topics is at
<http://leaverou.github.io/awesomplete/#api>.

Created by Lea Verou and other fantastic contributors.

[1]: https://github.com/LeaVerou/awesomplete/blob/gh-pages/LICENSE
