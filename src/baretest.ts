
import rgb from 'barecolor';

interface Suite {
  name: string
  fn: Function
}

export function baretest (headline: string) {
  const suite: Suite[] = [],
    beforeEach: Function[] = [],
    beforeAll: Function[] = [],
    afterEach: Function[] = [],
    afterAll: Function[] = [],
    only: Suite[] = []

  function self(name: string, fn: Function) {
    suite.push({ name: name, fn: fn })
  }

  self.only = function (name: string, fn: Function) {
    only.push({ name: name, fn: fn })
  }

  self.beforeEach = function (fn: Function) { beforeEach.push(fn) }
  self.beforeAll = function (fn: Function) { beforeAll.push(fn) }
  self.afterEach = function (fn: Function) { afterEach.push(fn) }
  self.afterAll = function (fn: Function) { afterAll.push(fn) }
  self.skip = function (fn: Function) { }

  self.run = async function () {
    const tests = only[0] ? only : suite

    rgb.cyan(headline + ' ')

    try {
      for (const fn of beforeAll) await fn()
    } catch (e) {
      for (const fn of afterAll) await fn()
      prettyError(e)
      return false
    }


    for (const test of tests) {
      try {
        for (const fn of beforeEach) await fn()
        await test.fn()
        rgb.gray('• ')

      } catch (e) {
        for (const fn of afterAll) await fn()
        rgb.red(`\n\n! ${test.name} \n\n`)
        prettyError(e)
        return false
      } finally {
        for (const fn of afterEach) {
          try {
            await fn()
          } catch (e) {
            prettyError(e)
          }
        }
      }
    }

    for (const fn of afterAll) {
      try {
        await fn()
      } catch (e) {
        prettyError(e)
      }
    }
    rgb.greenln(`✓ ${tests.length}`)
    console.info('\n')
    return true
  }

  return self

}


function prettyError(e: unknown) {
  const msg = e instanceof Error ? e.stack : null
  if (!msg) return rgb.yellow(e as string)

  const i = msg.indexOf('\n')
  rgb.yellowln(msg.slice(0, i))
  rgb.gray(msg.slice(i))
}