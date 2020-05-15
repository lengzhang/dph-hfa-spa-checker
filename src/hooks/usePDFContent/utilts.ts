const isNumber = new RegExp(/^(\d+(,\d+)*)|(\(\d+(,\d+)*\))$/)

const myParseInt = (str: string) => {
  if (/^\(\d+\)$/.test(str)) str = `-${str.replace(/\(|\)/g, '')}`
  return str === '-' ? 0 : parseInt(str.replace(/,/g, ''))
}

export { isNumber, myParseInt }
