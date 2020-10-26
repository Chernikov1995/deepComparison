const { checkGetSet } = require('./deepComparison.js')

describe('checkGetSet', () => {
  test(' return true if there are getters/setters', () => {
    const obj = {
      a: 1,
      get b () {
        return this.a + 1
      }
    }
    const res = checkGetSet(obj)

    expect(res).toBeTruthy()
  })
  test(' return false if there are  no getters/setters', () => {
    const obj = {
      a: 1,
      b: 2
    }
    const res = checkGetSet(obj)

    expect(res).toBeFalsy()
  })
})
