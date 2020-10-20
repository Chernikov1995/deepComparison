
const deepEqual = require('./deepComparison.js')

describe('compare simple same types', () => {
  test('should be true if same numbers', () => {
    const type1 = 1
    const type2 = 1
    const result = deepEqual(type1, type2)

    expect(result).toBeTruthy()
  })
  test('should be true if same strings', () => {
    const type1 = 'str'
    const type2 = 'str'
    const result = deepEqual(type1, type2)

    expect(result).toBeTruthy()
  })
  test('should be true if same undefined', () => {
    const type1 = undefined
    const type2 = undefined
    const result = deepEqual(type1, type2)

    expect(result).toBeTruthy()
  })
  test('should be true if same symbols', () => {
    const type1 = Symbol('a')
    const type2 = type1
    const result = deepEqual(type1, type2)

    expect(result).toBeTruthy()
  })
  test('should be true if same boolean', () => {
    const type1 = true
    const type2 = true
    const result = deepEqual(type1, type2)

    expect(result).toBeTruthy()
  })
  test('should be true if same BigInt', () => {
    const type1 = 123n
    const type2 = 123n
    const result = deepEqual(type1, type2)

    expect(result).toBeTruthy()
  })

  test('should be false if one NaN', () => {
    const type1 = NaN
    const type2 = 1
    const result = deepEqual(type1, type2)

    expect(result).toBeFalsy()
  })
  test('should be true if two NaN', () => {
    const type1 = NaN
    const type2 = NaN
    const result = deepEqual(type1, type2)

    expect(result).toBeTruthy()
  })

  test('true with 2 equal arrays', () => {
    const type1 = ['abc', 'aaa', 'vvv']
    const type2 = ['abc', 'aaa', 'vvv']
    const result = deepEqual(type1, type2)

    expect(result).toBeTruthy()
  })

  test('false with 2 equal arrays', () => {
    const type1 = ['abc', 'aac', 'vvv']
    const type2 = ['abc', 'aaa', 'vvv']
    const result = deepEqual(type1, type2)

    expect(result).toBeFalsy()
  })

  test('true with 2 equal objects', () => {
    const type1 = {
      name: 'John',
      age: 25
    }

    const type2 = {
      name: 'John',
      age: 25
    }
    const result = deepEqual(type1, type2)

    expect(result).toBeTruthy()
  })

  test('true with 2 different objects', () => {
    const type1 = {
      name: 'Malony',
      age: 25
    }

    const type2 = {
      name: 'John',
      age: 25
    }
    const result = deepEqual(type1, type2)

    expect(result).toBeFalsy()
  })

  test('Null and object', () => {
    const type1 = {}
    const type2 = null
    const result = deepEqual(type1, type2)

    expect(result).toBeFalsy()
  })

  test('Null and Null', () => {
    const type1 = null
    const type2 = null
    const result = deepEqual(type1, type2)

    expect(result).toBeTruthy()
  })

  test('Function and Function', () => {
    const func = () => {}
    const type1 = func
    const type2 = func
    const result = deepEqual(type1, type2)

    expect(result).toBeTruthy()
  })

  test('Function and Function', () => {
    const func = () => {}
    const type1 = func
    const type2 = null
    const result = deepEqual(type1, type2)

    expect(result).toBeFalsy()
  })

  test('Function and Function', () => {
    const func = () => {}
    const type1 = {}
    const type2 = func
    const result = deepEqual(type1, type2)

    expect(result).toBeFalsy()
  })

  test('should be true if compare objects with same methods', () => {
      const method = () => {}
      const obj1 = { b: 2, a: 1, c: method }
      const obj2 = { a: 1, b: 2, c: method }
      const result = deepEqual(obj1, obj2)
      expect(result).toBeTruthy()
    })

  test('should be false if compare objects with not same methods', () => {
      const method = () => {}
      const method2 = () => {}
      const obj1 = { b: 2, a: 1, c: method }
      const obj2 = { a: 1, b: 2, c: method2 }
      const result = deepEqual(obj1, obj2)
      expect(result).toBeFalsy()
    })

   test('should be false if compare objects with not same array', () => {
      const obj = { a: 1, arr: [1, 2, 3] }
      const other = { a: 1, arr: [1, 2, 3, 4] }
      const result = deepEqual(obj, other)
      expect(result).toBeFalsy()
    })
   test('should be true if compare objects with same Symbols key', () => {
        const key1 = Symbol('key1')
        const obj1 = {}
        obj1[key1] = 'key1'
        obj1.string = 'stringkey'
        const obj2 = {}
        obj2[key1] = 'key1'
        obj2.string = 'stringkey'
        expect(deepEqual(obj1, obj2)).toBeTruthy()
      })


    test('should be false if compare objects with not same Symbols key', () => {
        const key1 = Symbol('key1')
        const key2 = Symbol('key2')
        const obj1 = {}
        obj1[key1] = 'key1'
        obj1.string = 'stringkey'
        const obj2 = {}
        obj2[key2] = 'key2'
        obj2.string = 'stringkey'
        expect(deepEqual(obj1, obj2)).toBeFalsy()
      })

    test('should be true if compare one instance of class', () => {
      class Person {
        constructor(personName, personAge) {
          this.name = personName
          this.age = personAge
        }

        get info() {
          return this.name
        }
      }

      const ivan = new Person('Ivan', 23)
      expect(deepEqual(ivan, ivan)).toBeTruthy()
    })

    test('should be false if compare two instance of one class', () => {
      class Person {
        constructor(personName, personAge) {
          this.name = personName
          this.age = personAge
        }

        get info() {
          return this.name
        }
      }

      const ivan = new Person('Ivan', 23)
      const oleg = new Person('Oleg', 23)
      expect(deepEqual(ivan, oleg)).toBeFalsy()
    })

    test('should be false if compare two instance of two class', () => {
      class Woman {
        constructor(personName, personAge) {
          this.name = personName
          this.age = personAge
        }

        get info() {
          return this.name
        }
      }

      class Man {
        constructor(personName, personAge) {
          this.name = personName
          this.age = personAge
        }

        get info() {
          return this.name
        }
      }

      const olga = new Woman('Olga', 23)
      const oleg = new Man('Oleg', 23)
      expect(deepEqual(olga, oleg)).toBeFalsy()
    })

    test('should be true if compare class constructor', () => {
      class Woman {
        constructor(personName, personAge) {
          this.name = personName
          this.age = personAge
        }

        get info() {
          return this.name
        }
      }
      expect(deepEqual(Woman, Woman)).toBeTruthy()
    })
  
    test('should be false if compare not same class constructor', () => {
      class Woman {
        constructor(personName, personAge) {
          this.name = personName
          this.age = personAge
        }

        get info() {
          return this.name
        }
      }

      class Man {
        constructor(personName, personAge) {
          this.name = personName
          this.age = personAge
        }

        get info() {
          return this.name
        }
      }
      expect(deepEqual(Woman, Man)).toBeFalsy()
    })

    // array
  describe('array:', () => {
    test('should be true if compare array', () => {
      const obj1 = ['str', null, 1]
      const obj2 = ['str', null, 1]
      const result = deepEqual(obj1, obj2)
      expect(result).toBeTruthy()
    })


    test('should be false if compare not same array', () => {
      const obj1 = ['str', null, 1]
      const obj2 = ['str', undefined, 1]
      const result = deepEqual(obj1, obj2)
      expect(result).toBeFalsy()
    })


    test('should be true if compare array with additional property', () => {
      const arr1 = [1, 2, 3]
      const arr2 = [1, 2, 3]
      arr1.test = 'test'
      arr2.test = 'test'
      const result = deepEqual(arr2, arr1)
      expect(result).toBeTruthy()
    })
  })


    





})
