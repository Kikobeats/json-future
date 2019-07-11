'use strict'

const should = require('should')
const path = require('path')
const fs = require('fs')

const jsonFuture = require('..')

const FIXTURES = {
  string: '{\n  "foo": "bar"\n}',
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
      const json = jsonFuture.parse(FIXTURES.string)
      should(json.foo).be.equal(FIXTURES.object.foo)
    })

    it('.stringify', function () {
      const string = jsonFuture.stringify(FIXTURES.object)
      should(string).be.equal(FIXTURES.string)
    })

    it('.load', function () {
      const json = jsonFuture.load(FIXTURES.path)
      should(json.foo).be.equal(FIXTURES.object.foo)
    })

    it('.save', function () {
      jsonFuture.save(FIXTURES.path2, { hello: 'world' })
      const json = jsonFuture.load(FIXTURES.path2)
      should(json.hello).be.equal('world')
    })
  })

  describe('async', function () {
    describe('.parseAsync', function () {
      describe('promise', function () {
        ;[
          ['String', FIXTURES.string],
          ['Buffer', Buffer.from(FIXTURES.string)]
        ].forEach(function (pair) {
          const type = pair[0]
          const input = pair[1]

          it(type, function (done) {
            jsonFuture
              .parseAsync(input)
              .then(function (json) {
                should(json.foo).be.equal(FIXTURES.object.foo)
                done()
              })
              .catch(done)
          })
        })
      })

      describe('callback', function () {
        ;[
          ['String', FIXTURES.string],
          ['Buffer', Buffer.from(FIXTURES.string)]
        ].forEach(function (pair) {
          const type = pair[0]
          const input = pair[1]

          it(type, function (done) {
            jsonFuture.parseAsync(input, function (err, data) {
              should(data.foo).be.equal(FIXTURES.object.foo)
              done(err)
            })
          })
        })
      })
    })

    describe('.stringifyAsync', function () {
      it('callback', function (done) {
        jsonFuture
          .stringifyAsync(FIXTURES.object)
          .then(function (string) {
            should(string).be.equal(FIXTURES.string)
            done()
          })
          .catch(done)
      })

      it('callback', function (done) {
        jsonFuture.stringifyAsync(FIXTURES.object, function (err, string) {
          should(string).be.equal(FIXTURES.string)
          done(err)
        })
      })
    })

    describe('.loadAsync', function () {
      it('promise', function (done) {
        jsonFuture
          .loadAsync(FIXTURES.path)
          .then(function (json) {
            should(json.foo).be.equal(FIXTURES.object.foo)
            done()
          })
          .catch(done)
      })

      it('callback', function (done) {
        jsonFuture.loadAsync(FIXTURES.path, function (err, json) {
          should(json.foo).be.equal(FIXTURES.object.foo)
          done(err)
        })
      })
    })

    describe('.saveAsync', function () {
      it('promise', function (done) {
        jsonFuture
          .saveAsync(FIXTURES.path2, { hello: 'world2' })
          .then(() => jsonFuture.loadAsync(FIXTURES.path2))
          .then(json => {
            should(json.hello).be.equal('world2')
            done()
          })
          .catch(done)
      })

      it('callback', function (done) {
        jsonFuture.saveAsync(
          FIXTURES.path2,
          {
            hello: 'world2'
          },
          function (err) {
            if (err) return done(err)
            jsonFuture.loadAsync(FIXTURES.path2, function (err, json) {
              should(json.hello).be.equal('world2')
              done(err)
            })
          }
        )
      })
    })
  })
})
