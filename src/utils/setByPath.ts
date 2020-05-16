const setByPath = (obj, value, path) => {
  var i
  path = path.split('.')
  for (i = 0; i < path.length - 1; i++) obj = obj[path[i]]
  obj[path[i]] = value
}

export default setByPath
