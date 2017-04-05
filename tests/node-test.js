import { expect } from 'chai';
import Node from '../scripts/node'

describe('Class: Node', () => {
  it('should have data', function() {
    let node = new Node(0);

    expect(node.data).to.eq(0);
  });

  it('should have a children object', function() {
    let node = new Node(0);

    expect(node.children).to.deep.eq({});
  });

  it('should default to not being a word', () => {
    let node = new Node(0);

    expect(node.isWord).to.eq(false);
  })

  it('should default to having never been selected', () => {
    let node = new Node(0);

    expect(node.timesSelected).to.eq(0);
  })
})
