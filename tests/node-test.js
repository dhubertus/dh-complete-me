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

})
