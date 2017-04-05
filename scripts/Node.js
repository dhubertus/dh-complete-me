
export default class Node {
  constructor(data) {
    this.data = data;
    this.children = {} || null
    this.isWord = false
    this.timesSelected = 0
  }
}
