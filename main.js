//first homework

//1.  Implement Symbol.iterator for a Custom Range Object. Create a custom range object that can iterate over a range of numbers. Implement the Symbol.iterator method to allow it to be used with for...of loops.
// for (let num of range) {
//     console.log(num); // Should log numbers from 1 to 5
// }
class CustomRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  }
}

const range = new CustomRange(1, 5);

for (let num of range) {
  console.log(num);
}

// 2. Implement a lazy evaluation wrapper for arrays where methods like map and filter are computed only when the value is accessed. Use proxies to intercept property access.
// let lazy = lazyArray([1, 2, 3, 4]).map(x => x * x).filter(x => x > 5);
// console.log(lazy[1]); // Computed at this point: 16

function lazyArray(array) {
  return new Proxy(array, {
    get(target, prop, receiver) {
      if (typeof target[prop] === "function") {
        return function (...args) {
          const result = target[prop].apply(target, args);
          return lazyArray(result);
        };
      }
      return Reflect.get(target, prop, receiver);
    },
  });
}

let lazy = lazyArray([1, 2, 3, 4])
  .map((x) => x * x)
  .filter((x) => x > 5);
console.log(lazy[1]);

// 3. Custom Set Implementation with O(1) Complexity for Add, Remove, and Check Operations. Implement a custom Set class with constant time complexity for add, remove, and check operations. Internally use a JavaScript object to store elements.
// let mySet = new CustomSet();
// mySet.add(1);
// mySet.add(2);
// console.log(mySet.has(1)); // true
// mySet.remove(1);
// console.log(mySet.has(1)); // false
class CustomSet {
  constructor() {
    this.elements = {};
  }

  add(element) {
    this.elements[element] = true;
  }

  has(element) {
    return this.elements[element] === true;
  }

  remove(element) {
    delete this.elements[element];
  }
}

let mySet = new CustomSet();
mySet.add(1);
mySet.add(2);
console.log(mySet.has(1));
mySet.remove(1);
console.log(mySet.has(1));

// 4. Write a function to deeply freeze an object. Unlike Object.freeze, which only freezes the top-level properties, a deep freeze will recursively apply to all nested objects.
// let obj = { a: { b: 2 } };
// deepFreeze(obj);
// obj.a.b = 3; // Throws error in strict mode
function deepFreeze(obj) {
  Object.freeze(obj);

  for (let prop in obj) {
    if (
      obj.hasOwnProperty(prop) &&
      obj[prop] !== null &&
      typeof obj[prop] === "object"
    ) {
      deepFreeze(obj[prop]);
    }
  }

  return obj;
}

let obj = { a: { b: 2 } };
deepFreeze(obj);
obj.a.b = 3;

// 5. Create a function to check the type of a variable against a given type, including support for primitive types, built-in types (like Array, Date), and custom classes.
// console.log(isType(5, 'number')); // true
// console.log(isType(new Date(), Date)); // true
// console.log(isType([], 'array')); // true
function isType(variable, type) {
  if (typeof type === "string") {
    type = type.toLowerCase();
    if (type === "array") {
      return Array.isArray(variable);
    }
    return typeof variable === type;
  }

  return variable instanceof type;
}

console.log(isType(5, "number"));
console.log(isType(new Date(), Date));
console.log(isType([], "array"));

// 6. Write a JavaScript function named isEquivalent that replicates the functionality of the Object.is method. This function should provide a reliable way to check if two values are exactly the same, including correctly handling JavaScript’s unique cases like NaN, and distinguishing between -0 and +0.
// isEquivalent(NaN, NaN) should return true.
// isEquivalent(0, -0) should return false.
// isEquivalent(5, 5) should return true.
// isEquivalent('hello', 'hello') should return true.
// isEquivalent('hello', 'world') should return false.
// isEquivalent(true, false) should return false.
function isEquivalent(value1, value2) {
  if (Object.is(value1, value2)) {
    return true;
  }

  if (Object.is(value1, 0) && Object.is(value2, 0)) {
    return 1 / value1 === 1 / value2;
  }

  return value1 !== value1 && value2 !== value2;
}

console.log(isEquivalent(NaN, NaN));
console.log(isEquivalent(0, -0));
console.log(isEquivalent(5, 5));
console.log(isEquivalent("hello", "hello"));
console.log(isEquivalent("hello", "world"));
console.log(isEquivalent(true, false));

// second homework

// Create a function which returns the number of true values there are in an array.

function countTrue(arr) {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === true) {
      count++;
    }
  }

  return count;
}
console.log(countTrue([true, false, false, true, false]));
console.log(countTrue([false, false, false, false]));
console.log(countTrue([]));

// 2. Create a function named getType that determines the type of a given value in JavaScript. This function should handle all JavaScript primitive types, arrays, and objects. The implementation should use an object to map types to their respective logic for type determination, avoiding the use of traditional if or switch statements.
function getType(value) {
  const typeMap = {
    string: () => typeof value === "string",
    number: () => typeof value === "number",
    boolean: () => typeof value === "boolean",
    undefined: () => typeof value === "undefined",
    null: () => value === null,
    array: () => Array.isArray(value),
    object: () =>
      typeof value === "object" && !Array.isArray(value) && value !== null,
  };

  for (let type in typeMap) {
    if (typeMap[type]()) {
      return type;
    }
  }

  return "unknown";
}
console.log(getType([1, 2, 3])); // Should return "array"
// 3. A repdigit is a positive number composed out of the same digit. Create a function that takes an integer and returns whether it’s a repdigit or not.
function isRepdigit(num) {
  const numStr = num.toString();
  for (let i = 0; i < numStr.length; i++) {
    if (numStr[i] !== numStr[numStr.length - 1 - i]) {
      return false;
    }
  }
  return true;
}
console.log(isRepdigit(66));
console.log(isRepdigit(0));
console.log(isRepdigit(-11));

// 4. Create a function that takes an object and returns the keys and values as separate arrays. Return the keys sorted alphabetically, and their corresponding values in the same order.
function keysAndValues(obj) {
  const keys = Object.keys(obj).sort();
  const values = keys.map((key) => obj[key]);
  return [keys, values];
}
console.log(keysAndValues({ a: 1, b: 2, c: 3 }));
console.log(keysAndValues({ a: "Apple", b: "Microsoft", c: "Google" }));
console.log(keysAndValues({ key1: true, key2: false, key3: undefined }));
// 5. Create a function that takes an array of numbers and returns the second largest number.
function getSecondLargest(arr) {
  const sortedArr = arr.sort((a, b) => b - a);
  return sortedArr[1];
}

console.log(getSecondLargest([10, 40, 30, 20, 50]));
console.log(getSecondLargest([25, 143, 89, 13, 105]));
console.log(getSecondLargest([54, 23, 11, 17, 10]));
// 6. Create a function that takes a number and returns an array with the digits of the number in reverse order.
function reverseArr(num) {
  return num.toString().split("").reverse().join("").split("").map(Number);
}
console.log(reverseArr(1485979));
console.log(reverseArr(623478));
console.log(reverseArr(12345));

// homework third

// 1. Given an array of objects, group them by a specific property. For instance, given an array of people objects, group them by ‘age’.
function groupByProperty(arr, property) {
  const grouped = {};
  arr.forEach((obj) => {
    const key = obj[property];
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(obj);
  });
  return grouped;
}

const people = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 30 },
];

console.log(groupByProperty(people, "age"));
// Output: { '25': [ { name: 'Bob', age: 25 } ], '30': [ { name: 'Alice', age: 30 }, { name: 'Charlie', age: 30 } ] }

// 2. Create a function that deeply flattens an array. The function should be able to handle nested arrays of any depth.

function deepFlatten(arr) {
  const flattened = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flattened.push(...deepFlatten(arr[i]));
    } else {
      flattened.push(arr[i]);
    }
  }
  return flattened;
}
const nestedArray = [1, [2, [3, [4]], 5]];
console.log(deepFlatten(nestedArray));
// // Output: [1, 2, 3, 4, 5]
// 3. Write a custom implementation of the Array.prototype.map function without using the native .map() method.
// const numbers = [1, 2, 3];
function customMap(arr, callback) {
  const mapped = [];
  for (let i = 0; i < arr.length; i++) {
    mapped.push(callback(arr[i]));
  }
  return mapped;
}
// const doubled = customMap(numbers, num => num * 2);
// console.log(doubled);
// // Output: [2, 4, 6]
// 4. Given two arrays, combine them into one array without any duplicates. Use array methods to achieve this, and consider the performance.
function combineUnique(arr1, arr2) {
  const combined = [...arr1, ...arr2];
  return [...new Set(combined)];
}
// const array1 = [1, 2, 3];
// const array2 = [2, 3, 4];
// console.log(combineUnique(array1, array2));
// // Output: [1, 2, 3, 4]
// 5. Write a function that finds the longest string in an array of strings. Make sure it handles edge cases properly.
function findLongestString(arr) {
  let longest = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > longest.length) {
      longest = arr[i];
    }
  }
  return longest;
}
// const strings = ["short", "medium length", "longest string"];
// console.log(findLongestString(strings));
// // Output: "longest string"
// 6. Create a function that takes two arrays and returns an array of their intersection (elements that are present in both arrays).
function arrayIntersection(arr1, arr2) {
  const intersection = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) {
      intersection.push(arr1[i]);
    }
  }
  return intersection;
}
// const nums1 = [1, 2, 3, 4];
// const nums2 = [3, 4, 5, 6];
// console.log(arrayIntersection(nums1, nums2));
// // Output: [3, 4]
// 7. Write a function that splits an array into groups of a specified size. For example, chunking an array into subarrays of length 2.
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
// const data = [1, 2, 3, 4, 5, 6, 7];
// console.log(chunkArray(data, 3));
// // Output: [[1, 2, 3], [4, 5, 6], [7]]
// 8. Write a custom implementation of the Array.prototype.reduceRight method. This function applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value.
function customReduceRight(arr, callback, initialValue) {
  let accumulator = initialValue;
  for (let i = arr.length - 1; i >= 0; i--) {
    accumulator = callback(accumulator, arr[i], i, arr);
  }
  return accumulator;
}
// const array = [1, 2, 3, 4];
// const sum = customReduceRight(array, (acc, value) => acc + value, 0);
// console.log(sum);
// // Output: 10
