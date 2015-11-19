var map = new WeakMap();
function createAndGetObservableDictionary(inst) {
  if(!map.has(inst)) {
    map.set(inst, {});
  }
  return map.get(inst);
};
export function createAndGetObservable(inst, key) {
  var dict = createAndGetObservableDictionary(inst);
  dict[key] = dict[key] || ko.observable();
  return dict[key];
}
export function createObservablePropertyOnPrototype(targetClass, key) {
  Object.defineProperty(targetClass.prototype, key, {
    get: function() {
      return function() {
        return createAndGetObservable(this, key).apply(this, arguments);
      }
    }
  });
  Object.defineProperty(targetClass.prototype, key + "Observable", {
    get: function() {
      return function() {
        return createAndGetObservable(this, key);
      }
    }
  });
}
