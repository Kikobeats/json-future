# JSON Future

![Last version](https://img.shields.io/github/tag/Kikobeats/json-future.svg?style=flat-square)
[![Build Status](http://img.shields.io/travis/Kikobeats/json-future/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/json-future)
[![Dependency status](http://img.shields.io/david/Kikobeats/json-future.svg?style=flat-square)](https://david-dm.org/Kikobeats/json-future)
[![Dev Dependencies Status](http://img.shields.io/david/dev/Kikobeats/json-future.svg?style=flat-square)](https://david-dm.org/Kikobeats/json-future#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/json-future.svg?style=flat-square)](https://www.npmjs.org/package/json-future)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

> Unbelievable and Modern JSON interface. Prollyfills propositions for ECMAScript 7.

> Prollyfill: A polyfill for a not yet standardized API.

## Why

* High level methods for manipulate JSON files (stringify, parse, load and save).
* Backward compatibility with JSON Object in Node or Browser.
* Async support (Node Callback style and Promise).

JSON Future is based into a set of cool libraries to handle JSON, but some of this libraries uses promises or callback style. This library adds an extra layer to call these libraries uniformly.

## Install

```bash
npm install json-future --save
```

If you want to use in the browser (powered by [Browserify](http://browserify.org/)):

```bash
bower install json-future --save
```

and later link in your HTML:

```html
<script src="bower_components/json-future/dist/json-future.js"></script>
```

## Usage

```js
var jsonFuture = require('json-future');
```

Don't be afraid to replace for the default `JSON` object. The library is specially designed for be compatible and don't break your code:

```js
JSON = require('json-future');
```

Also you can do this action using the `register` helper:

```js
require('json-future/register')
```

## API

In `async` methods, if you don't provide a callback for node style, then the method return a `Promise`.

### .stringify(input, [replacer], [space])
### .stringifyAsync(input, [replacer], [space], [cb])

Creates the `string` version of the input.

### .parse(input, [reviver], [filename])
### .parseAsync(input, [reviver], [filename], [cb])

Creates the `object` version of the input.

### .load(filepath)
### .loadAsync(filepath, [cb])

Returns the parsed JSON.

### .save(filepath, data, [options])
### .saveAsync(filepath, data, [options], [cb])

Stringify and write JSON to a file atomically.

#### options

##### indent

Type: `string`, `number`
Default: `\t`

Indentation as a string or number of spaces.
Pass in `null` for no formatting.

##### sortKeys

Type: `boolean`, `function`
Default: `false`

Sort the keys recursively.
Optionally pass in a [`compare`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) function.

##### replacer

Type: `function`

Passed into [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter).

##### mode

Type: `number`
Default `438` *(0666 in octal)*

[Mode](https://en.wikipedia.org/wiki/File_system_permissions#Numeric_notation) used when writing the file.

## License

MIT © [Kiko Beats](http://kikobeats.com)
