
const primitiveTypes = [
  'boolean',
  'undefined',
  'number',
  'string',
  'bigint',
  'symbol'
]

/**
 * @param value
 */
function checkPrimitiveType (value) {
  return primitiveTypes.includes(typeof value)
}

const cache1 = new Map()
const cache2 = new Map()

function deepEqual (obj1, obj2) {
  if (Number.isNaN(obj1) || Number.isNaN(obj2)) {
    return Number.isNaN(obj1) && Number.isNaN(obj2)
  }

  if (obj1 === null || obj2 === null) {
    return obj1 === obj2
  }

  if (checkPrimitiveType(obj1) && checkPrimitiveType(obj2)) {
    return obj1 === obj2
  }

  if (Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2)) {
    if (typeof obj1 === 'function') {
      return obj1 === obj2
    }

    const check1 = cache1.get(obj1)
    const check2 = cache2.get(obj2)

    if (!check1) {
      cache1.set(obj1, cache1.size + 1)
    }

    if (!check2) {
      cache2.set(obj2, cache2.size + 1)
    }

    if (check1 && check2) {
      return check1 === check2
    }

    if (cache1.size !== cache2.size) {
      return false
    }

    const object1Keys = Reflect.ownKeys(obj1)
    const object2Keys = Reflect.ownKeys(obj2)

    if (object1Keys.length !== object2Keys.length) {
      return false
    }

    return object1Keys.every((key) => deepEqual(obj1[key], obj2[key]))
  }

  return false
}

/**
 * @param obj1
 * @param obj2
 */
function wrapper (obj1, obj2) {
  cache1.clear()
  cache2.clear()
  return deepEqual(obj1, obj2)
}

module.exports = {
  checkPrimitiveType,
  wrapper,
  deepEqual
}
