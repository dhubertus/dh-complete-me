import { expect } from 'chai';
import Tree from '../scripts/Tree'
require('locus')

describe('Class: Tree', () => {
  it('should be an instance of tree', function() {
    let tree = new Tree();

    expect(tree).to.be.instanceof(Tree);
  });

  it('should have a root node with a value of null', () => {
    let tree = new Tree();

    expect(tree.rootNode.data).to.eq(null)
  })

  it('should have a insertion counter that defaults to zero', () => {
    let tree = new Tree();

    expect(tree.count).to.be.eq(0)
  })

  describe('Method: insert()', () => {

    it('should have a method called insert that marks a word complete and counts entries', () => {
      let tree = new Tree();

      tree.insert('polymer')
      
      expect(tree.findNode('polymer').isWord).to.eq(true)
      expect(tree.count).to.eq(1)
    })

    it('should only insert new nodes where two words differentiate from one another', () => {
      let tree = new Tree();

      tree.insert('art')
      tree.insert('arts')
      tree.insert('arty')


//NOTE: written in expanded form to prove path is correct
      expect(tree.rootNode.children.a.data).to.eq('a')
      expect(tree.rootNode.children.a.children.r.data).to.eq('r')
      expect(tree.rootNode.children.a.children.r.children.t.data).to.eq('t')
      expect(tree.rootNode.children.a.children.r.children.t.children.s.data).to.eq('s')
      expect(tree.rootNode.children.a.children.r.children.t.children.y.data).to.eq('y')
    })

    it('should mark nodes as word endings even when words overlap one another', () => {
      let tree = new Tree();

      tree.insert('art')
      tree.insert('arts')

      expect(tree.findNode('ar').isWord).to.eq(false)
      expect(tree.findNode('art').isWord).to.eq(true)
      expect(tree.findNode('arts').isWord).to.eq(true)
    })
  })

  describe('Method: findNode()', () => {

    it('should return the last node of a string of text', () => {
      let tree = new Tree();

      tree.insert('polymer')
      tree.insert('arts')

      expect(tree.findNode('p').data).to.eq('p')
      expect(tree.findNode('po').data).to.eq('o')
      expect(tree.findNode('pol').data).to.eq('l')
      expect(tree.findNode('ar').data).to.eq('r')
    })

    it('should return the last node of a string as a structured object', () => {
      let tree = new Tree();

      tree.insert('polymer')

      expect(tree.findNode('polyme')).to.deep.eq({"children": {"r": {"children": {}, "data": "r", "isWord": true, "timesSelected": 0}}, "data": "e", "isWord": false, "timesSelected": 0})
    })
  })

  describe('Method: count()', () => {

    it('should have a function that returns the number of words in the tree', () => {
      let tree = new Tree();

      tree.insert('pizza')
      tree.insert('pizzas')
      tree.insert('pit')
      tree.insert('pickle')
      tree.insert('pices')
      tree.insert('pinch')

      expect(tree.count).to.eq(6)
    })
  })

  describe('Method: suggest()', () => {

    it('should return an array of possible matches that have shared letters', () => {
      let tree = new Tree();

      tree.insert('pizza')
      tree.insert('pizzas')
      tree.insert('pit')
      tree.insert('pickle')
      tree.insert('pices')
      tree.insert('pinch')

      let result = tree.suggest('pi')

      expect(result).to.deep.eq(['pizza', 'pizzas', 'pit', 'pickle', 'pices', 'pinch'])
    })
  })

  describe('Method: populate()', () => {

    it('should have 235886 words counted', () => {
      let tree = new Tree();

      tree.populate()

      expect(tree.count).to.be.eq(235886)
    })

    it('should return a specific array from the dictionary', () => {
      let tree = new Tree();

      tree.populate()

      expect(tree.suggest('piz')).to.deep.eq(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
    })
  })

  describe('Method: select()', () => {

    it('should increment the timesSelected counter of a node', () => {
      let tree = new Tree();

      tree.populate()
      tree.select('piz', 'pizza')

      expect(tree.findNode('pizza').timesSelected).to.eq(1)

      tree.select('piz', 'pizza')

      expect(tree.findNode('pizza').timesSelected).to.eq(2)
    })

    it('when suggest is called it should return an array of sorted words based on times selected', () => {

      let tree = new Tree();

      tree.populate()

      tree.select('piz', 'pizza')
      tree.select('piz', 'pizza')
      tree.select('piz', 'pizza')
      tree.select('piz', 'pizzle')
      tree.select('piz', 'pizzle')
      tree.select('piz', 'pizzicato')

      expect(tree.findNode('pizza').timesSelected).to.eq(3)
      expect(tree.findNode('pizzle').timesSelected).to.eq(2)
      expect(tree.findNode('pizzicato').timesSelected).to.eq(1)
      expect(tree.suggest('piz')).to.deep.eq(['pizza', 'pizzle', 'pizzicato', "pize", "pizzeria"])
    })
  })
})
