// TODO: Add slice dep

'use strict'

var util = require('./util')
var Args = require('args-js')
var nodeify = require('nodeify')
var promise = require('cb2promise')

function _checkString (data) {
  return data = data instanceof Buffer ? data.toString() : data
}

module.exports = {
  stringifyAsync: function stringifyAsync () {
    var args = Array.prototype.slice.call(arguments)
    var cb = typeof args[args.length - 1] === 'function' ? args.pop() : null

    var params = Args([
      { data: Args.OBJECT | Args.Required },
      { replacer: Args.FUNCTION | Args.Optional },
      { space: Args.NUMBER | Args.Optional, _default: 2 }
    ], args)

    var data = params.data
    var replacer = params.replacer
    var space = params.space

    if (!cb) return promise(util.stringifyAsync, data, replacer, space)
    return util.stringifyAsync(data, replacer, space, cb)
  },

  stringify: function stringify () {
    var params = Args([
      { data: Args.OBJECT | Args.Required },
      { replacer: Args.FUNCTION | Args.Optional },
      { space: Args.NUMBER | Args.Optional, _default: 2 }
    ], arguments)

    var data = params.data
    var replacer = params.replacer
    var space = params.space

    return util.stringify(data, replacer, space)
  },
  parseAsync: function parseAsync () {
    var args = Array.prototype.slice.call(arguments)
    var cb = typeof args[args.length - 1] === 'function' ? args.pop() : null
    var params = Args([
      { data: Args.STRING | Args.Required, _check: _checkString },
      { reviver: Args.FUNCTION | Args.Optional },
      { filename: Args.STRING | Args.Optional }
    ], args)

    var data = params.data
    var reviver = params.reviver
    var filename = params.filename

    if (!cb) return promise(util.parseAsync, data, reviver, filename)
    return util.parseAsync(data, reviver, filename, cb)
  },
  parse: util.parse,
  loadAsync: function loadAsync () {
    var params = Args([
      { filepath: Args.STRING | Args.Required },
      { cb: Args.FUNCTION | Args.Optional }
    ], arguments)

    var filepath = params.filepath
    var cb = params.cb

    if (cb) return nodeify(util.loadAsync(filepath), cb)
    return util.loadAsync(filepath)
  },
  load: function load () {
    var params = Args([
      { filepath: Args.STRING | Args.Required }
    ], arguments)

    var filepath = params.filepath

    return util.load(filepath)
  },
  saveAsync: function saveAsync () {
    var params = Args([
      { filepath: Args.STRING | Args.Required },
      { data: Args.OBJECT | Args.Required },
      { opts: Args.OBJECT | Args.Optional, _default: { indent: '  ' } },
      { cb: Args.FUNCTION | Args.Optional }
    ], arguments)

    var filepath = params.filepath
    var data = params.data
    var opts = params.opts
    var cb = params.cb

    if (cb) return nodeify(util.saveAsync(filepath, data, opts), cb)
    return util.saveAsync(filepath)
  },
  save: function save () {
    var params = Args([
      { filepath: Args.STRING | Args.Required },
      { data: Args.OBJECT | Args.Required },
      { opts: Args.OBJECT | Args.Optional, _default: { indent: '  ' } }
    ], arguments)

    var filepath = params.filepath
    var data = params.data
    var opts = params.opts

    return util.save(filepath, data, opts)
  }
}
