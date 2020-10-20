
/**
 * @param obj1
 * @param obj2
 */
function deepEqual (obj1, obj2) {
  if (obj1 === obj2) {
    return true
  }

  if (obj1 === null || obj2 === null) {
    return false
  }

  if (Number.isNaN(obj1) && Number.isNaN(obj2)) {
    return true
  }

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false
  }

  if (obj1 && obj2 !== null) {
    const object1Keys = Reflect.ownKeys(obj1)
    const object2Keys = Reflect.ownKeys(obj2)

    if (object1Keys.length !== object2Keys.length) {
      return false
    }

    return object1Keys.every((key) => obj1[key] === obj2[key])
  }

  return false
}

module.exports = deepEqual
