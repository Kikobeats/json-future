'use strict'

os            = require 'os'
parse         = require 'parse-json'
asyncify      = require 'async.wrapsync'
loadJsonFile  = require 'load-json-file'
writeJsonFile = require 'write-json-file'
stringifySafe = require 'json-stringify-safe'

stringify = (data, replacer, space) ->
  stringifySafe(data, replacer, space) + os.EOL

module.exports.stringify = stringify
module.exports.stringifyAsync = asyncify stringify

module.exports.parse = parse
module.exports.parseAsync = asyncify parse

module.exports.load = loadJsonFile.sync
module.exports.loadAsync = loadJsonFile

module.exports.save = writeJsonFile.sync
module.exports.saveAsync = writeJsonFile
