import React, { Component } from "react";
import Node from "./Node/Node";
import Dijkstra from "./Algorithms/Dijkstra's";
import Astar from "./Algorithms/Astar";
import "./Algovisualize.css";
import Navbar from "../Navbar/Navbar";

class Algovisualize extends Component {
  constructor(props) {
    super();
    this.state = {
      rows: 35,
      cols: 30,
      source: {
        x: 5,
        y: 5
      },
      destination: {
        x: 10,
        y: 16
      },
      grid: [],
      onMouseIsPressed: false,
      IsRunning: false,
      isGridFilled: false
    };
  }

  componentDidMount() {
    const grid = this.initgrid();
    this.setState({ grid: grid });
    // this.setState({ source: this.props.source });
    // this.setState({ destination: this.props.destination });
  }

  onMouseDown = event => {
    this.toggleWall(event);
    this.setState({ onMouseIsPressed: true });
  };

  onMouseUp = event => {
    this.setState({ onMouseIsPressed: false });
  };

  onMouseEnter = event => {
    if (!this.state.onMouseIsPressed) return;

    this.toggleWall(event);
  };

  createNode = (
    row,
    col,
    isSource,
    isDestination,
    isWall,
    isVisited,
    isShortest
  ) => {
    return {
      row: row,
      col: col,
      onMouseUp: this.onMouseUp,
      onMouseDown: this.onMouseDown,
      onMouseEnter: this.onMouseEnter,
      isSource: isSource,
      isWall: isWall,
      isVisited: isVisited,
      isShortest: isShortest,
      isDestination: isDestination,
      prevNode: null
    };
  };

  toggleWall = event => {
    const clickedNode = event.target;
    const id = clickedNode.id;
    const idSplit = id.split("-");

    const r = parseInt(idSplit[1]),
      c = parseInt(idSplit[2]);
    var grid = this.state.grid;

    var toggleWall = "true";

    if (grid[r][c].isSource === "true" || grid[r][c].isDestination === "true")
      return;

    if (grid[r][c].isWall === "true") toggleWall = "false";

    grid[r][c] = this.createNode(
      r,
      c,
      "false",
      "false",
      toggleWall,
      "false",
      "false"
    );

    this.setState({ grid: grid });
  };

  initgrid = () => {
    var grid = [];
    for (var i = 0; i < this.state.rows; i++) {
      var row = [];
      for (var j = 0; j < this.state.cols; j++) {
        row.push(
          this.createNode(i, j, "false", "false", "false", "false", "false")
        );
      }
      grid.push(row);
    }

    const sx = this.state.source.x;
    const sy = this.state.source.y;
    grid[sx][sy] = this.createNode(
      sx,
      sy,
      "true",
      "false",
      "false",
      "false",
      "false"
    );

    const dx = this.state.destination.x;
    const dy = this.state.destination.y;
    grid[dx][dy] = this.createNode(
      dx,
      dy,
      "false",
      "true",
      "false",
      "false",
      "false"
    );

    return grid;
  };

  visualizeDijkstra = () => {
    const { grid, rows, cols, source, destination } = this.state;
    var dijkstra = new Dijkstra(
      grid,
      rows,
      cols,
      grid[source.x][source.y],
      grid[destination.x][destination.y]
    );
    var visNodesList = dijkstra.findShortestPath();
    var shortestPath = dijkstra.getShortestPathList();

    this.animateVisnodes(visNodesList, shortestPath);
  };

  visualizeAstar = () => {
    const { grid, rows, cols, source, destination } = this.state;
    var astar = new Astar(
      grid,
      rows,
      cols,
      grid[source.x][source.y],
      grid[destination.x][destination.y]
    );

    var visNodesList = astar.findShortestPath();
    var shortestPath = astar.getShortestPathList();
    this.animateVisnodes(visNodesList, shortestPath);
  };

  animateVisnodes = (list, shortestPath) => {
    if (typeof list === "undefined" || list.length === 0) {
      this.animateShortestPath(shortestPath);
      return;
    }

    var node = list.splice(0, 1)[0];
    node.isVisited = "true";

    var grid = this.state.grid;
    grid[node.row][node.col] = node;
    this.setState({ grid: grid });

    setTimeout(() => {
      this.animateVisnodes(list, shortestPath);
    }, 20);
  };

  animateShortestPath = shortestPath => {
    if (typeof shortestPath === "undefined" || shortestPath.length === 0) {
      this.setState({ IsRunning: false });
      return;
    }
    var node = shortestPath.splice(0, 1)[0];
    node.isShortest = "true";
    node.isVisited = "false";

    var grid = this.state.grid;
    grid[node.row][node.col] = node;
    this.setState({ grid: grid });

    setTimeout(() => {
      this.animateShortestPath(shortestPath);
    }, 100);
  };

  runChecks = algorithm => {
    return this.state.IsRunning || algorithm === "none";
  };

  setIsRunning() {
    this.setState({ IsRunning: true });
  }
  setGridFilled() {
    this.setState({ isGridFilled: true }, () =>
      console.log(this.state.isGridFilled)
    );
  }

  visualize = async algorithm => {
    if (this.runChecks(algorithm)) return;
    if (this.state.isGridFilled) await this.clearGrid();
    this.setGridFilled();
    this.setIsRunning();

    if (algorithm === "dijkstra") {
      this.visualizeDijkstra();
    } else if (algorithm === "astar") {
      this.visualizeAstar();
    }
  };

  clearGrid = async () => {
    if (this.state.IsRunning) return;

    this.setState({
      rows: 35,
      cols: 30,
      source: {
        x: 5,
        y: 5
      },
      destination: {
        x: 10,
        y: 16
      },
      grid: [],
      onMouseIsPressed: false,
      IsRunning: false,
      isGridFilled: false
    });
    const grid = this.initgrid();
    this.setState({ grid: grid });
  };

  render() {
    const space = " ";

    return (
      <>
        <Navbar visualize={this.visualize} clear={this.clearGrid} />
        <div className="grid">
          {this.state.grid.map(row => {
            return row.map(node => {
              return (
                <>
                  <Node
                    row={node.row}
                    col={node.col}
                    key={`${node.row}-${node.col}`}
                    isSource={node.isSource}
                    isDestination={node.isDestination}
                    isWall={node.isWall}
                    isVisited={node.isVisited}
                    isShortest={node.isShortest}
                    onMouseDown={this.onMouseDown}
                    onMouseEnter={this.onMouseEnter}
                    onMouseUp={this.onMouseUp}
                  />
                  <span className="space" key={`space-${node.row}-${node.col}`}>
                    {space}
                  </span>
                </>
              );
            });
          })}
        </div>
      </>
    );
  }
}

export default Algovisualize;
