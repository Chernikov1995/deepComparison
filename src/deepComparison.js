
/**
 * @param obj1
 * @param obj2
 */
function deepEqual (obj1, obj2) {
  if (obj1 === obj2) {
    return true
  }

  if (Number.isNaN(obj1) || Number.isNaN(obj2)) {
    return Number.isNaN(obj1) && Number.isNaN(obj2)
  }

  if (!obj1 || !obj2) {
    return false
  }

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false
  }

  const object1Keys = Reflect.ownKeys(obj1)
  const object2Keys = Reflect.ownKeys(obj2)

  if (object1Keys.length !== object2Keys.length) {
    return false
  }

  return object1Keys.every((key) => deepEqual(obj1[key], obj2[key]))
}

module.exports = deepEqual
