'use strict'

fs         = require 'fs'
os         = require 'os'
promise    = require 'cb2promise'
Errorifier = require 'errorifier'
parseJSON  = require 'json-parse-async'

_stringifySync = (data) -> JSON.stringify(data, null, 2) + os.EOL

_stringify = (data, cb) ->
  try
    content = JSON.stringify(data, null, 2) + os.EOL
  catch err
    content = {}
    error = new Errorifier
      code: 'ENOVALIDJSON',
      message: err.message
  finally
    process.nextTick ->
      cb error, content

_read = (filename, cb) ->
  fs.readFile filename, encoding:'utf8', cb

_readSync = (filename) ->
  fs.readFile filename, encoding:'utf8'

_save = (filename, data, cb) ->
  _stringify data, (err, data) ->
    return cb err, data if err
    fs.writeFile filename, data, encoding:'utf8', cb

_saveSync = (filename, data) ->
  fs.writeFile filename, _stringifySync(data), encoding:'utf8'


module.exports =

  stringify: (data, cb) ->
    return promise _stringify, data if arguments.length is 1
    _stringify data, cb

  stringifySync: _stringifySync

  read: (filename, cb) ->
    return promise _read, filename if arguments.length is 1
    _read filename, cb

  readSync: _readSync

  save: (filename, data, cb) ->
    _save filename, data, cb
    return promise _save, filename if arguments.length is 1

  saveSync: _saveSync

  parse: parseJSON
  parseSync: JSON.parse
