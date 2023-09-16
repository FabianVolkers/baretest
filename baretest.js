
const rgb = require('barecolor')

module.exports = function(headline) {
  const suite = [],
    beforeEach = [],
    beforeAll = [],
    afterEach = [],
    afterAll = [],
    only = []

  function self(name, fn) {
    suite.push({ name: name, fn: fn })
  }

  self.only = function(name, fn) {
    only.push({ name: name, fn: fn })
  }

  self.beforeEach = function(fn) { beforeEach.push(fn) }
  self.beforeAll = function(fn) { beforeAll.push(fn) }
  self.afterEach = function (fn) { afterEach.push(fn) }
  self.afterAll = function(fn) { afterAll.push(fn)  }
  self.skip = function(fn) {}

  self.run = async function() {
    const tests = only[0] ? only : suite

    rgb.cyan(headline + ' ')

    for (const fn of beforeAll) await fn()

    for (const test of tests) {
      try {
        for (const fn of beforeEach) await fn()
        await test.fn()
        rgb.gray('• ')

      } catch(e) {
        for (const fn of afterAll) await fn()
        rgb.red(`\n\n! ${test.name} \n\n`)
        prettyError(e)
        return false
      } finally {
        for (const fn of afterEach) await fn()
      }
    }

    for (const fn of afterAll) await fn()
    rgb.greenln(`✓ ${ tests.length }`)
    console.info('\n')
    return true
  }

  return self

}


function prettyError(e) {
  const msg = e.stack
  if (!msg) return rgb.yellow(e)

  const i = msg.indexOf('\n')
  rgb.yellowln(msg.slice(0, i))
  rgb.gray(msg.slice(i))
}

