'use strict'

fs = require 'fs'
JSON   = require '..'
should = require 'should'
parseJson  = require 'parse-json'
path = require 'path'

FIXTURES =
  string: '{\n  "foo": "bar"\n}\n'
  object: foo: 'bar'
  path: path.join process.cwd(), 'test', 'fixture.json'
  path2: path.join process.cwd(), 'test', 'fixture2.json'

describe 'JSON Future ::', ->

  after (done) -> fs.unlink FIXTURES.path2, done

  describe 'sync', ->

    it '.parse', ->
      json = JSON.parse FIXTURES.string
      json.foo.should.be.equal FIXTURES.object.foo

    it '.stringify', ->
      string = JSON.stringify FIXTURES.object
      string.should.be.equal FIXTURES.string

    it '.load', ->
      json = JSON.load FIXTURES.path
      json.foo.should.be.equal FIXTURES.object.foo

    it '.save',  ->
      JSON.save FIXTURES.path2, hello:'world'
      json = JSON.load FIXTURES.path2
      json.hello.should.be.equal 'world'

  describe 'async', ->

    describe '.parseAsync', ->
      it 'String', (done) ->
        JSON.parseAsync FIXTURES.string, (err, data) ->
          data.foo.should.be.equal FIXTURES.object.foo
          done err

      it 'Buffer', (done) ->
        buff = new Buffer(FIXTURES.string)
        JSON.parseAsync buff, (err, data) ->
          data.foo.should.be.equal FIXTURES.object.foo
          done err

    it '.stringifyAsync', (done) ->
      JSON.stringifyAsync FIXTURES.object, (err, string) ->
        string.should.be.equal FIXTURES.string
        done err

    it '.loadAsync', (done) ->
      JSON.loadAsync FIXTURES.path, (err, json) ->
        json.foo.should.be.equal FIXTURES.object.foo
        done err

    it 'saveAsync', (done) ->
      JSON.saveAsync FIXTURES.path2, hello:'world2', (err) ->
        return done err if err
        json = JSON.loadAsync FIXTURES.path2, (err, json) ->
          json.hello.should.be.equal 'world2'
          done err

