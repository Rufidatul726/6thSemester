import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';

const TreeVisualization = () => {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    // Fetch the JSON data from the file
    fetch('/example.json') // Use the relative path
      .then((response) => response.json())
      .then((data) => setTreeData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ width: '100%', height: '500px', justifyContent: 'center' }}>
      {treeData ? (
        <Tree data={treeData} orientation="vertical" />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default TreeVisualization;
