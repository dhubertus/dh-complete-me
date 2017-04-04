import { expect } from 'chai';
import Tree from '../scripts/Tree'
import Node from '../scripts/Node'
require('locus')

describe('Tree', () => {
  it('should be an instance of tree', function() {
    let tree = new Tree();

    expect(tree).to.be.instanceof(Tree);
  });

  it('should have a root node of null', () => {
    let tree = new Tree();

    expect(tree.rootNode.data).to.eq(null)
  })

  it('should have a function called insert that splits a word', () => {
    let tree = new Tree();

    tree.insert('art')
    tree.insert('arts')
    tree.insert('arty')


    expect(tree.rootNode.children.a.data).to.eq('a')
    expect(tree.rootNode.children.a.children.r.data).to.eq('r')
    expect(tree.rootNode.children.a.children.r.children.t.data).to.eq('t')
    expect(tree.rootNode.children.a.children.r.children.t.children.s.data).to.eq('s')

  })
  it('should have a function called insert that splits a word', () => {
    let tree = new Tree();

    tree.insert('art')
    tree.insert('polymer')
    tree.findNode('polymer')
    eval(locus)
  })


})
