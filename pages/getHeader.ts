import pdfjsLib from 'pdfjs-dist'

export type Header = Record<string, { key: string; value: string }>

export interface GetHeader {
  (items: pdfjsLib.TextContentItem[], start: number, end: number): Header
}

const getHeader: GetHeader = (items, start, end) => {
  const result = {}
  for (let i = start; i < end; ++i) {
    const item = items[i].str
    if (
      /^(PROJECT NAME)|(Agency Name)|(Budget Period)|(Contract Number)|(CLAIM PERIOD)/i.test(
        item
      )
    ) {
      const [key, value] = item.split(':')
      result[key.toLowerCase().replace(' ', '-')] = {
        key,
        value: value.trim(),
      }
    } else if (/^Date Prepared/i.test(item)) {
      result[item.toLowerCase().replace(' ', '-')] = {
        key: item.replace(':', ''),
        value: items[++i].str.trim(),
      }
    }
  }
  return result
}

export default getHeader
