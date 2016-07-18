'use strict'

var os = require('os')
var parse = require('parse-json')
var asyncify = require('async/asyncify')
var loadJsonFile = require('load-json-file')
var writeJsonFile = require('write-json-file')
var stringifySafe = require('json-stringify-safe')

function stringify (data, replacer, space) {
  return stringifySafe(data, replacer, space) + os.EOL
}

module.exports.stringify = stringify
module.exports.stringifyAsync = asyncify(stringify)
module.exports.parse = parse
module.exports.parseAsync = asyncify(parse)
module.exports.load = loadJsonFile.sync
module.exports.loadAsync = loadJsonFile
module.exports.save = writeJsonFile.sync
module.exports.saveAsync = writeJsonFile
