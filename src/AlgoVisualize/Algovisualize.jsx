import React, { Component } from 'react'
import Node from './Node/Node';
import Dikstra from './Algorithms/Dikstra\'s';

class Algovisualize extends Component {
  
  constructor(props) {
    super();
    this.state = {
      rows: 35,
      cols: 50,
      source: {
        x: 3,
        y: 5
      },
      destination: {
        x: 20,
        y: 13
      },
      grid: [],
      onMouseIsPressed: false
    }
  }

  componentDidMount() {
    const grid = this.initgrid();
    this.setState({grid: grid});
    this.setState({source: this.props.source});
    this.setState({destination: this.props.destination});
  }

  onMouseDown = (event) => {
    console.log("md");
    this.toggleWall(event);
    this.setState({onMouseIsPressed: true});
  }

  onMouseUp = (event) => {
    console.log("mu");
    this.setState({onMouseIsPressed: false});
  }

  onMouseEnter = (event) => {
    console.log("enter");
    if(!this.state.onMouseIsPressed) return;

    this.toggleWall(event);
  }

  createNode = (row, col, isSource, isDestination, isWall) => {
    return {
      row:row, 
      col:col, 
      onMouseUp:this.onMouseUp,
      onMouseDown:this.onMouseDown, 
      onMouseEnter:this.onMouseEnter, 
      isSource:isSource,
      isWall:isWall,
      isDestination:isDestination,
      
    }
  }

  toggleWall = (event) => {
    const clickedNode = event.target;
    const id = clickedNode.id;
    const idSplit = id.split("-");

    const r = parseInt(idSplit[1]), c = parseInt(idSplit[2]);
    var grid = this.state.grid;

    var toggleWall = "true";
    
    if (grid[r * this.state.cols + c].isSource === "true" || grid[r * this.state.cols + c].isDestination === "true") return;

    if (grid[r * this.state.cols + c].isWall === "true")
      toggleWall = "false";

    grid[r * this.state.cols + c] = this.createNode(r, c, "false", "false", toggleWall);

    this.setState({grid: grid})
  } 

  initgrid = () => {
    
    var grid = [];
    for(var i = 0; i < this.state.rows; i++)
        for(var j = 0; j < this.state.cols; j++) {
            grid.push(this.createNode(i, j, "false", "false", "false"));
        }
    
    const sx = this.state.source.x;
    const sy = this.state.source.y;
    grid[sx * this.state.cols + sy] = this.createNode(sx, sy, "true", "false", "false");

    const dx = this.state.destination.x;
    const dy = this.state.destination.y;
    grid[ dx * this.state.cols + dy] = this.createNode(dx, dy, "false", "true", "false");

    return grid;    
  }
  
  visualizeDijkstra = () => {


  }

  render() {

    return (
      <>

      <button onClick={() => this.visualizeDijkstra()}>
      Visualize Dijkstra's Algorithm
      </button>
      
      <div className="grid">
        {this.state.grid.map(node => { return (<Node 
                                                row={node.row} 
                                                col={node.col} 
                                                key={`${node.row}-${node.col}`} 
                                                isSource={node.isSource} 
                                                isDestination={node.isDestination}        
                                                isWall={node.isWall}
                                                onMouseDown={this.onMouseDown}
                                                onMouseEnter={this.onMouseEnter}
                                                onMouseUp={this.onMouseUp}
                                                />) 
                                      } )}       
      </div>

      </>
    )
  }
}

export default Algovisualize;
