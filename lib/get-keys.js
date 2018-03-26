module.exports = (c, onlyOwnProperty) => {
  let dic = {}
  Object.getOwnPropertyNames(c).forEach((x) => dic[x] = true)

  if (!onlyOwnProperty) {
    let t = c.__proto__
    while (t) {
      Object.getOwnPropertyNames(t).forEach((x) => dic[x] = true)
      t = t.__proto__
    }
  }
  [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toString',
    'valueOf',
    'toLocaleString',
  ].forEach((x) => delete dic[x])

  return Object.keys(dic).filter(x => !x.startsWith('_'))
}