import assert from 'assert';
import baretest from '@fabianvolkers/baretest';
import process from 'process';

// Tests for Baretest
const test = baretest('test')

let count = 0

function incr() {
  count++
}

test.beforeAll(incr)

test('A', incr)

test.skip('B', incr)


test('rejects', async function() {
  await assert.rejects(async function() {
    throw new TypeError('Oops')
  },
    { name: 'TypeError', message: 'Oops' }
  )
})


!(async function() {
  try {
    await test.run()
    assert.equal(count, 3)

  } finally {
    process.exit()
  }
})()