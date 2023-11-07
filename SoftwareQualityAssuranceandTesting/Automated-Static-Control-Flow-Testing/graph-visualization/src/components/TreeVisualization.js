import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';

const TreeVisualization = () => {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const convertASTToTreeData = (node) => {
      const treeData = { 
        name: node._nodetype ,
      };

      // console.log(treeData);

      if(node.coord){
        const coord = node.coord.split(':');
        const { file, line, column } = { file: coord[0], line: coord[1], column: coord[2] };
        treeData.attributes = { file, line, column };
      }

      if(node.body){  
        treeData.children = convertASTToTreeData(node.body);
      }

      else if(node.decl){
        treeData.children = convertASTToTreeData(node.decl);
      }

      else if(node.block_items){
        treeData.children = node.block_items.map((child) => convertASTToTreeData(child));
      }
      
      else if (node.ext) {
        treeData.children = node.ext.map((child) => convertASTToTreeData(child));
      }
  
      return treeData;
    };
    // Fetch the JSON data from the file (assuming it's in the public folder)
    fetch('/astTest.json')
      .then((response) => response.json())
      .then((data) => {
        const treeData = convertASTToTreeData(data);
        setTreeData(treeData);
        console.log(treeData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  

  return (
    <div style={{ width: '100%', height: '500px' }}>
      {treeData ? (
        console.log(treeData),
        <Tree data={treeData} orientation="vertical" />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default TreeVisualization;
