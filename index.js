const fi = (function () {
  return {
    libraryMethod: function () {
      return "Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0";
    },

    each: function (collection, callback) {
      let index = 0;
      let length = this.size(collection);
      while (index < length) {
        if (Array.isArray(collection)) {
          callback(collection[index]);
        } else {
          let values = Object.values(collection);
          callback(values[index]);
        }
        index++;
      }
      return collection;
    },

    map: function (collection, callback) {
      let index = 0;
      let length = this.size(collection);
      let result = [];
      while (index < length) {
        if (Array.isArray(collection)) {
          result.push(callback(collection[index]));
        } else {
          let values = Object.values(collection);
          result.push(callback(values[index]));
        }
        index++;
      }
      return result;
    },

    reduce: function (collection, callback, acc) {
      let index = 0;
      let length = this.size(collection);
      let returnValue;
      if (acc !== undefined) {
        returnValue = acc;
      } else {
        returnValue = collection[0];
        index++;
      }
      while (index < length) {
        returnValue = callback(returnValue, collection[index]);
        index++;
      }
      return returnValue;
    },

    functions: function () {},

    find: function (collection, callback) {
      let index = 0;
      while (index < this.size(collection)) {
        let isFound = callback(collection[index]);
        if (isFound) {
          return collection[index];
        } else {
          index++;
        }
      }
      return undefined;
    },

    filter: function (collection, callback) {
      let index = 0;
      let result = [];
      while (index < this.size(collection)) {
        let isFound = callback(collection[index]);
        if (isFound) result.push(collection[index]);
        index++;
      }
      return result;
    },

    size: function (collection) {
      let count = 0;
      for (let i in collection) {
        count++;
      }
      return count;
    },

    first: function (array, n) {
      let limit = n === undefined ? 1 : n;
      let index = 0;
      if (limit === 1) return array[index];
      let result = [];
      while (index < limit) {
        result.push(array[index]);
        index++;
      }
      return result;
    },

    last: function (array, n) {
      let limit = n === undefined ? 1 : n;
      let index = this.size(array) - 1;
      if (limit === 1) return array[index];
      let result = [];
      while (limit > 0) {
        result.unshift(array[index]);
        index--;
        limit--;
      }
      return result;
    },

    compact: function (array) {
      let result = [];
      this.each(array, (el) => {
        if (el) result.push(el);
      });
      return result;
    },

    sortBy: function (array, callback) {
      let result = [...array];
      return result.sort(function (a, b) {
        return callback(a) - callback(b);
      });
    },

    flatten: function (arr, shallow = false, result = []) {
      for (let element of arr) {
        if (shallow) {
          if (Array.isArray(element)) {
            for (let el of element) result.push(el);
          } else {
            result.push(element);
          }
        } else {
          if (Array.isArray(element)) {
            this.flatten(element, false, result);
          } else {
            result.push(element);
          }
        }
      }
      return result;
    },

    uniq: function (array, isSorted, callback) {
      if (isSorted) {
        const sortedArr = [array[0]];
        let idx = 0;
        for (let i = 1; i < array.length; i++) {
          if (sortedArr[idx] !== array[i]) {
            sortedArr.push(array[i]);
            idx++;
          }
        }
        return sortedArr;
      } else if (!callback) return Array.from(new Set(array));
      else {
        const modifiedVals = new Set();
        const uniqVals = new Set();
        for (let val of array) {
          const moddedVal = iteratee(val);
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal);
            uniqVals.add(val);
          }
        }
        return Array.from(uniqVals);
      }
    },
  };
})();

const unsortedIntArr = [3, 8, 5, 1, 9, 11, 8];
const unsortedStringArr = ["maru", "choux", "doge", "coconut"];
const unsortedObjArr = [
  { name: "dennis", age: 29 },
  { name: "dee", age: 40 },
  { name: "mac", age: 34 },
  { name: "charlie", age: 32 },
  { name: "frank", age: 72 },
];
const controlSortedObjArr = [
  { name: "dennis", age: 29 },
  { name: "charlie", age: 32 },
  { name: "mac", age: 34 },
  { name: "dee", age: 40 },
  { name: "frank", age: 72 },
];

function sortArrFunction(val) {
  return val;
}
function sortIntsBySin(val) {
  return Math.sin(val);
}
function sortObjFunction(obj) {
  return obj.age;
}

console.log(fi.sortBy(unsortedIntArr, sortArrFunction));
