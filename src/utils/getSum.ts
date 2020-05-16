const keys = ['A', 'B', 'C', 'D', 'E']

export interface GetSum {
  (list: any[]): { A: number; B: number; C: number; D: number; E: number }
}

const getSum: GetSum = (list) => {
  return list.reduce(
    (acc, cur) => {
      keys.forEach((e) => {
        acc[e] += cur[e]
      })
      return acc
    },
    { A: 0, B: 0, C: 0, D: 0, E: 0 }
  )
}

export default getSum
