'use strict'

parse         = require 'parse-json'
asyncify      = require 'async.wrapsync'
loadJsonFile  = require 'load-json-file'
writeJsonFile = require 'write-json-file'
stringifySafe = require 'json-stringify-safe'

ensureAsync = (fn, args) ->
  setImmediate fn.apply null, args

stringify = (data, replacer, space) ->
  stringifySafe(data, replacer, space) + '\n'

module.exports.stringify = stringify
module.exports.stringifyAsync = -> ensureAsync asyncify(stringify), arguments

module.exports.parse = parse
module.exports.parseAsync = -> ensureAsync asyncify(parse), arguments

module.exports.load = loadJsonFile.sync
module.exports.loadAsync = loadJsonFile

module.exports.save = writeJsonFile.sync
module.exports.saveAsync = writeJsonFile
