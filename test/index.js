'use strict'
var FIXTURES, JSON, fs, parseJson, path, should

fs = require('fs')

JSON = require('..')

should = require('should')

parseJson = require('parse-json')

path = require('path')

FIXTURES = {
  string: '{\n  "foo": "bar"\n}\n',
  object: {
    foo: 'bar'
  },
  path: path.join(process.cwd(), 'test', 'fixture.json'),
  path2: path.join(process.cwd(), 'test', 'fixture2.json')
}

describe('JSON Future ::', function () {
  after(function (done) {
    return fs.unlink(FIXTURES.path2, done)
  })
  describe('sync', function () {
    it('.parse', function () {
      var json
      json = JSON.parse(FIXTURES.string)
      return json.foo.should.be.equal(FIXTURES.object.foo)
    })
    it('.stringify', function () {
      var string
      string = JSON.stringify(FIXTURES.object)
      return string.should.be.equal(FIXTURES.string)
    })
    it('.load', function () {
      var json
      json = JSON.load(FIXTURES.path)
      return json.foo.should.be.equal(FIXTURES.object.foo)
    })
    return it('.save', function () {
      var json
      JSON.save(FIXTURES.path2, {
        hello: 'world'
      })
      json = JSON.load(FIXTURES.path2)
      return json.hello.should.be.equal('world')
    })
  })
  return describe('async', function () {
    describe('.parseAsync', function () {
      it('String', function (done) {
        return JSON.parseAsync(FIXTURES.string, function (err, data) {
          data.foo.should.be.equal(FIXTURES.object.foo)
          return done(err)
        })
      })
      return it('Buffer', function (done) {
        var buff
        buff = new Buffer(FIXTURES.string)
        return JSON.parseAsync(buff, function (err, data) {
          data.foo.should.be.equal(FIXTURES.object.foo)
          return done(err)
        })
      })
    })
    it('.stringifyAsync', function (done) {
      return JSON.stringifyAsync(FIXTURES.object, function (err, string) {
        string.should.be.equal(FIXTURES.string)
        return done(err)
      })
    })
    it('.loadAsync', function (done) {
      return JSON.loadAsync(FIXTURES.path, function (err, json) {
        json.foo.should.be.equal(FIXTURES.object.foo)
        return done(err)
      })
    })
    return it('saveAsync', function (done) {
      return JSON.saveAsync(FIXTURES.path2, {
        hello: 'world2'
      }, function (err) {
        var json
        if (err) {
          return done(err)
        }
        return json = JSON.loadAsync(FIXTURES.path2, function (err, json) {
          json.hello.should.be.equal('world2')
          return done(err)
        })
      })
    })
  })
})
