import Node from '../scripts/node'

export default class Tree {
  constructor() {
    this.rootNode = new Node(null)
  }

  insert(word) {
    let node = this.rootNode
    let splitArray = word.split('')

    splitArray.forEach((letter) => {
      // let newNode = new Node(letter)

      if (node.children[letter]) {
        return node = node.children[letter]
      }

      node.children[letter] = new Node(letter);
      node = node.children[letter];
    })

    node.isWord = true
    node.address = word
  }

  findNode(word) {
    let node = this.rootNode
    let splitArray = word.split('')

    splitArray.forEach((letter) => {

      if (node.children[letter]) {
        return node = node.children[letter]
      }
    })

    if (node.address === word) {
      console.log(node)
      return node
    }
  }
}
