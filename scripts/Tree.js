import Node from '../scripts/node'
const text = "/usr/share/dict/words"
var fs = require('fs');
require('locus')

export default class Tree {
  constructor() {
    this.rootNode = new Node(null)
    this.count = 0;
  }

  insert(word) {
    let node = this.rootNode
    let splitArray = word.split('')
    let address = ''

    splitArray.forEach((letter) => {

      if (node.children[letter]) {
        address = address + letter
        return node = node.children[letter]
      }

      node.children[letter] = new Node(letter);
      node = node.children[letter];
      address = address + letter
      node.address = address
    })

    node.isWord = true
    this.count ++;
  }

  findNode(text) {
    let node = this.rootNode
    let splitArray = text.split('')

    splitArray.forEach((letter) => {

      if (node.children[letter]) {
        return node = node.children[letter]
      }
    })

    if (node.address === text) {
      return node
    }
  }

  // suggest(text, suggested) {
  //
  //
  //
  //   let node = this.findNode(text)
  //   var suggested = suggested || []
  //
  //   console.log(suggested)
  //
  //   let nextLetter =
  //   Object.getOwnPropertyNames(node.children).toString()
  //   console.log(nextLetter)
  //
  //   if(node.isWord) {
  //     suggested.push(text)
  //   }
  //
  //   if(!node.isWord) {
  //     let newText = text + nextLetter
  //     // console.log(newText.toString())
  //     this.suggest(newText, suggested)
  //   }
  //   console.log(suggested)
  //   return suggested
  // }

  suggest(text) {
    let node = this.findNode(text)
    var suggested = []
    // eval(locus)
    const filterKeys = (node) => {
      // eval(locus)
      if(node.isWord){
        suggested.push(node.address)
      }

      Object.keys(node.children).forEach((key) => {
        filterKeys(node.children[key])
      })
    }

    filterKeys(node)
    return suggested

  }

  populate() {
    let dictionary = fs.readFileSync(text).toString().trim().split('\n')

    dictionary.forEach((word) => {
      this.insert(word)
    })
  }


}
