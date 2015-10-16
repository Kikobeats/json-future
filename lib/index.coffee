'use strict'

fs         = require 'fs'
Args       = require 'args-js'
promise    = require 'cb2promise'
Errorifier = require 'errorifier'
parseJSON  = require 'json-parse-async'

_stringify = (data, replacer, space) ->
  JSON.stringify(data, replacer, space) + '\n'

_stringifyAsync = ->
  {data, replacer, space, cb}  = Args([
    { data    : Args.OBJECT   | Args.Required              }
    { replacer: Args.FUNCTION | Args.Optional              }
    { space   : Args.NUMBER   | Args.Optional, _default: 2 }
    { cb      : Args.FUNCTION | Args.Optional              }
  ], arguments)

  try
    content = JSON.stringify(data, replacer, space) + '\n'
  catch err
    content = {}
    error = new Errorifier
      code: 'ENOVALIDJSON',
      message: err.message
  finally
    process.nextTick ->
      cb error, content

_loadAsync = (filepath, opts, cb) ->
  fs.readFile filepath, opts, cb

_load = (filepath, opts) ->
  fs.readFileSync filepath, opts

_saveAsync = (filepath, data, opts, cb) ->
  _stringifyAsync data, opts.replacer, (err, data) ->
    return cb err, data if err
    fs.writeFile filepath, data, opts, cb

_save = (filepath, data, opts) ->
  fs.writeFileSync filepath, _stringify(data), opts

module.exports =

  stringifyAsync: (data, replacer, space, cb)->
    return promise _stringifyAsync, data unless cb
    _stringifyAsync data, cb

  stringify: ->
    {data, replacer, space}  = Args([
      { data    : Args.OBJECT   | Args.Required             }
      { replacer: Args.FUNCTION | Args.Optional             }
      { space   : Args.NUMBER   | Args.Optional _DEFAULT: 2 }
    ], arguments)

    _stringify data, replacer, space

  parseAsync: parseJSON

  parse: JSON.parse

  loadAsync: ->
    OPTIONS =
      encoding: 'utf8'
    {filepath, opts, cb}  = Args([
      { filepath : Args.STRING   | Args.Required                             }
      { opts      : Args.OBJECT  | Args.Optional, _default: encoding: 'utf8' }
      { cb       : Args.FUNCTION | Args.Optional                             }
    ], arguments)

    return promise _loadAsync, filepath, opts unless cb
    _loadAsync filepath, opts, cb

  load: ->
    {filepath, opts}  = Args([
      { filepath : Args.STRING   | Args.Required                             }
      { opts      : Args.OBJECT  | Args.Optional, _default: encoding: 'utf8' }
    ], arguments)

    _load filepath, opts

  saveAsync: ->
    {filepath, data, opts, cb}  = Args([
      { filepath : Args.STRING   | Args.Required                             }
      { data     : Args.OBJECT   | Args.Required                             }
      { opts      : Args.OBJECT  | Args.Optional, _default: encoding: 'utf8' }
      { cb       : Args.FUNCTION | Args.Optional                             }
    ], arguments)

    return promise _saveAsync, filepath, data, opts unless cb
    _saveAsync filepath, data, opts, cb

  save: ->
    {filepath, data, opts}  = Args([
      { filepath : Args.STRING   | Args.Required                             }
      {opts      : Args.OBJECT   | Args.Optional, _default: encoding: 'utf8' }
    ], arguments)

    _save filepath, data, opts
