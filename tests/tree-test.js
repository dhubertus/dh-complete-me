import { expect } from 'chai';
import Tree from '../scripts/Tree'
import Node from '../scripts/Node'
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

  describe('Method: insert()', () => {
    it('should have a function called insert that splits a word', () => {
      let tree = new Tree();

      tree.insert('art')
      tree.insert('arts')
      tree.insert('arty')

      expect(tree.rootNode.children.a.data).to.eq('a')
      expect(tree.rootNode.children.a.children.r.data).to.eq('r')
      expect(tree.rootNode.children.a.children.r.children.t.data).to.eq('t')
      expect(tree.rootNode.children.a.children.r.children.t.children.s.data).to.eq('s')
      expect(tree.rootNode.children.a.children.r.children.t.children.y.data).to.eq('y')
    })

    it('should have a function called insert that splits a word', () => {
      let tree = new Tree();

      tree.insert('art')
      tree.insert('polymer')
      tree.findNode('polymer')
    })
  })

  describe('Method: findNode()', () => {
    it('should return the last node of the entry by using its address', () => {
      let tree = new Tree();

      tree.insert('polymer')
      tree.insert('arts')

      expect(tree.findNode('pol').data).to.eq('l')
      expect(tree.findNode('po').data).to.eq('o')
    })
  })

  describe('Method: suggest()', () => {
    it('should return an array of possible', () => {

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
      let result = tree.suggest('piz')

      expect(result).to.deep.eq(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
    })
  })

  describe('Method: select()', () => {

    it('should increment the slected nodes timesSelected prop', () => {
      let tree = new Tree();

      tree.populate()

      let result = tree.suggest('piz')

      tree.select('piz', 'pizza')
      tree.select('piz', 'pizza')
      tree.select('piz', 'pizza')
      tree.select('piz', 'pizzle')
      tree.select('piz', 'pizzle')
      tree.select('piz', 'pizzicato')
      tree.suggest('piz')




    })
  })
})
