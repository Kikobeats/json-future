'use strict'

var should = require('should')
var path = require('path')
var fs = require('fs')

var jsonFuture = require('..')

var FIXTURES = {
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
      var json = jsonFuture.parse(FIXTURES.string)
      should(json.foo).be.equal(FIXTURES.object.foo)
    })

    it('.stringify', function () {
      var string = jsonFuture.stringify(FIXTURES.object)
      should(string).be.equal(FIXTURES.string)
    })

    it('.load', function () {
      var json = jsonFuture.load(FIXTURES.path)
      should(json.foo).be.equal(FIXTURES.object.foo)
    })

    it('.save', function () {
      jsonFuture.save(FIXTURES.path2, {hello: 'world'})
      var json = jsonFuture.load(FIXTURES.path2)
      should(json.hello).be.equal('world')
    })
  })

  describe('async', function () {
    describe('.parseAsync', function () {
      it('String', function (done) {
        jsonFuture.parseAsync(FIXTURES.string, function (err, data) {
          should(data.foo).be.equal(FIXTURES.object.foo)
          done(err)
        })
      })

      it('Buffer', function (done) {
        var buff = new Buffer(FIXTURES.string)
        jsonFuture.parseAsync(buff, function (err, data) {
          should(data.foo).be.equal(FIXTURES.object.foo)
          done(err)
        })
      })
    })

    it('.stringifyAsync', function (done) {
      jsonFuture.stringifyAsync(FIXTURES.object, function (err, string) {
        should(string).be.equal(FIXTURES.string)
        done(err)
      })
    })

    it('.loadAsync', function (done) {
      jsonFuture.loadAsync(FIXTURES.path, function (err, json) {
        should(json.foo).be.equal(FIXTURES.object.foo)
        done(err)
      })
    })

    it('saveAsync', function (done) {
      jsonFuture.saveAsync(FIXTURES.path2, {
        hello: 'world2'
      }, function (err) {
        if (err) return done(err)
        jsonFuture.loadAsync(FIXTURES.path2, function (err, json) {
          should(json.hello).be.equal('world2')
          done(err)
        })
      })
    })
  })
})
