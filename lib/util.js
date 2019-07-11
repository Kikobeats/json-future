'use strict'

const parse = require('parse-json')
const asyncify = require('async/asyncify')
const loadJsonFile = require('load-json-file')
const writeJsonFile = require('write-json-file')
const safeStringify = require('fast-safe-stringify')

module.exports = {
  stringify: safeStringify,
  stringifyAsync: asyncify(safeStringify),
  parse: parse,
  parseAsync: asyncify(parse),
  load: loadJsonFile.sync,
  loadAsync: loadJsonFile,
  save: writeJsonFile.sync,
  saveAsync: writeJsonFile
}
