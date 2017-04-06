import Node from '../scripts/node'
import fs from 'fs'
const text = "/usr/share/dict/words"

require('locus')

export default class Tree {
  constructor() {
    this.rootNode = new Node(null)
    this.count = 0;
  }


  insert(word) {
    let node = this.rootNode
    let splitArray = word.split('')

    splitArray.forEach((letter) => {

      if (node.children[letter]) {
        return node = node.children[letter]
      }

      node.children[letter] = new Node(letter);
      node = node.children[letter];
    })

    node.isWord = true
    this.count++
  }


  findNode(text) {
    let node = this.rootNode
    let splitArray = text.split('')

    splitArray.forEach((letter) => {
      if (node.children[letter]) {
        return node = node.children[letter]
      }
    })

    return node
  }


  count() {
    return this.count
  }


  suggest(text, suggested) {
    let node = this.findNode(text)
    var suggestions = suggested || []

    if (node.isWord) {
      suggestions.push({word: text, timesSelected: node.timesSelected})
    }

    Object.keys(node.children).forEach((key) => {
      this.suggest(text + key, suggestions)
    })

    suggestions.sort((a, b) => {
      return b.timesSelected - a.timesSelected
    })

    let sortedArray = suggestions.map((obj) => {
      return obj['word']
    })

    return sortedArray
  }


  populate() {
    let dictionary = fs.readFileSync(text).toString().trim().split('\n')

    dictionary.forEach((word) => {

      this.insert(word.toLowerCase())
    })
  }


  select(text, selected) {
    let identification = this.suggest(text).find((val) => {
      return val === selected
    })
    let node = this.findNode(identification)

    node.timesSelected++
  }
}
