import { expect } from 'chai';
import Node from '../scripts/node'

describe('Node', () => {
  it('should have data', function() {
    let node = new Node(0);

    expect(node.data).to.eq(0);
  });

  it('should have a children object', function() {
    let node = new Node(0);

    expect(node.children).to.deep.eq({});
  });

  xit('should have a default null value for left and right nodes', function() {
    let node = new Node(0);

    expect(node.left).to.eq(null);
    expect(node.right).to.eq(null);
  });
})
