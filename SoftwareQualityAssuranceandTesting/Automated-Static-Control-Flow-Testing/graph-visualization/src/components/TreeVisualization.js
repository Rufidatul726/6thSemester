import React from 'react';
import Tree from 'react-d3-tree';

const data = {
  name: 'Root',
  children: [
    {
      name: 'Node 1',
      children: [
        { name: 'Node 1.1' },
        { name: 'Node 1.2' }
      ]
    },
    {
      name: 'Node 2'
    }
  ]
};

const TreeVisualization = () => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Tree data={data} orientation="vertical" />
    </div>
  );
};

export default TreeVisualization;
