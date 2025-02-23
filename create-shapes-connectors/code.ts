// This plugin creates 5 shapes on the screen.
const numberOfShapes = 5

// This file holds the main code for the plugin. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).

const nodes: SceneNode[] = [];
for (let i = 0; i < numberOfShapes; i++) {
  const shape = figma.createShapeWithText();
  shape.shapeType = 'ROUNDED_RECTANGLE'
  // You can set shapeType to one of: 'SQUARE' | 'ELLIPSE' | 'ROUNDED_RECTANGLE' | 'DIAMOND' | 'TRIANGLE_UP' | 'TRIANGLE_DOWN' | 'PARALLELOGRAM_RIGHT' | 'PARALLELOGRAM_LEFT'
  shape.x = i * 400;
  shape.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
  figma.currentPage.appendChild(shape);
  nodes.push(shape);
};

for (let i = 0; i < (numberOfShapes - 1); i++) {
  const connector = figma.createConnector();
  const strokeWeight = {...connector.strokeWeight};
  connector.strokeWeight = 8
  
  connector.connectorStart = {
    endpointNodeId: nodes[i].id,
    magnet: 'AUTO',
  }; 
  
  connector.connectorEnd = {
    endpointNodeId: nodes[i+1].id,
    magnet: 'AUTO',
  };
};

figma.currentPage.selection = nodes;
figma.viewport.scrollAndZoomIntoView(nodes);

// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();
