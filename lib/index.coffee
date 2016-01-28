'use strict'

util    = require './util'
Args    = require 'args-js'
nodeify = require 'nodeify'
promise = require 'cb2promise'

module.exports =

  stringifyAsync: ->
    args = Array.prototype.slice.call arguments
    cb = if typeof args[args.length - 1] is 'function' then args.pop() else null

    {data, replacer, space}  = Args([
      { data    : Args.OBJECT   | Args.Required              }
      { replacer: Args.FUNCTION | Args.Optional              }
      { space   : Args.NUMBER   | Args.Optional, _default: 2 }
    ], args)

    return promise util.stringifyAsync, data, replacer, space unless cb
    util.stringifyAsync data, replacer, space, cb

  stringify: ->
    {data, replacer, space}  = Args([
      { data    : Args.OBJECT   | Args.Required              }
      { replacer: Args.FUNCTION | Args.Optional              }
      { space   : Args.NUMBER   | Args.Optional, _default: 2 }
    ], arguments)

    util.stringify data, replacer, space

  parseAsync: ->
    args = Array.prototype.slice.call arguments
    cb = if typeof args[args.length - 1] is 'function' then args.pop() else null

    {data, reviver, filename}  = Args([
      { data     : Args.STRING   | Args.Required, _check: (data) ->
        data = if data instanceof Buffer then data.toString() else data }
      { reviver  : Args.FUNCTION | Args.Optional                        }
      { filename : Args.STRING   | Args.Optional                        }
    ], args)

    return promise util.parseAsync, data, reviver, filename unless cb
    util.parseAsync data, reviver, filename, cb

  parse: util.parse

  loadAsync: ->
    {filepath, opts, cb}  = Args([
      { filepath : Args.STRING   | Args.Required }
      { cb       : Args.FUNCTION | Args.Optional }
    ], arguments)

    return nodeify util.loadAsync(filepath), cb if cb
    util.loadAsync filepath

  load: ->
    {filepath, opts}  = Args([
      { filepath : Args.STRING | Args.Required }
    ], arguments)

    util.load filepath

  saveAsync: ->
    {filepath, data, opts, cb}  = Args([
      { filepath : Args.STRING   | Args.Required                         }
      { data     : Args.OBJECT   | Args.Required                         }
      { opts     : Args.OBJECT   | Args.Optional, _default: indent: '  ' }
      { cb       : Args.FUNCTION | Args.Optional                         }
    ], arguments)

    return nodeify util.saveAsync(filepath, data, opts), cb if cb
    util.saveAsync filepath

  save: ->
    {filepath, data, opts, cb}  = Args([
      { filepath : Args.STRING | Args.Required                         }
      { data     : Args.OBJECT | Args.Required                         }
      { opts     : Args.OBJECT | Args.Optional, _default: indent: '  ' }
    ], arguments)

    util.save filepath, data, opts
