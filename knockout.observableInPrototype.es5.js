"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createObservablePropertyOnPrototype;
var map = new WeakMap();
function createAndGetObservableDictionary(inst) {
  if (!map.has(inst)) {
    map.set(inst, {});
  }
  return map.get(inst);
};
function createAndGetObservable(inst, key) {
  var dict = createAndGetObservableDictionary(inst);
  dict[key] = dict[key] || ko.observable();
  return dict[key];
}

function createObservablePropertyOnPrototype(targetClass, key) {
  Object.defineProperty(targetClass.prototype, key, {
    get: function get() {
      return function () {
        return createAndGetObservable(this, key).apply(this, arguments);
      };
    }
  });
  Object.defineProperty(targetClass.prototype, key + "Observable", {
    get: function get() {
      return function () {
        return createAndGetObservable(this, key);
      };
    }
  });
}

module.exports = exports["default"];
