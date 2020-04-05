import React, { Component } from "react";
import Node from "./Node/Node";
import Dijkstra from "./Algorithms/Dijkstra's";
import Astar from "./Algorithms/Astar";
import Greedy from "./Algorithms/Greedy";
import BFS from "./Algorithms/BFS";
import DFS from "./Algorithms/DFS";
import "./Algovisualize.css";
import Navbar from "../Navbar/Navbar";

class Algovisualize extends Component {
  constructor(props) {
    super();
    this.state = {
      rows: 0,
      cols: 60,
      source: {
        x: 0,
        y: 0
      },
      destination: {
        x: 0,
        y: 59
      },
      cellSize: 0,
      grid: [],
      onMouseIsPressed: false,
      SourceSelected: false,
      DestSelected: false,
      IsRunning: false,
      isGridFilled: false
    };
  }

  componentDidMount() {
    this.setState(
      {
        cellSize: window.innerWidth / this.state.cols,
        rows: Math.floor((window.innerHeight - 250) * this.state.cols / window.innerWidth)
      },
      () => {
        const grid = this.initgrid();
        this.setState({ grid: grid });
      })
  }

  onMouseDown = event => {
    let classname = event.target.className.split(" ")[1];
    if (classname !== "source" && classname !== "destination") {
      this.toggleWall(event);
    } else if (classname === "source") {
      this.setState({ SourceSelected: true });
    } else if (classname === "destination") {
      this.setState({ DestSelected: true });
    }
    this.setState({ onMouseIsPressed: true });
  };

  onMouseUp = event => {
    this.setState({
      onMouseIsPressed: false,
      DestSelected: false,
      SourceSelected: false
    });
  };

  onMouseEnter = event => {
    let classname = event.target.className.split(" ")[1];
    if (!this.state.onMouseIsPressed) return;
    if (this.state.SourceSelected && classname !== "destination") {
      this.toggleSource(event);
    } else if (this.state.DestSelected && classname !== "source") {
      this.toggleDest(event);
    } else {
      this.toggleWall(event);
    }
  };

  onMouseLeave = event => {
    let classname = event.target.className.split(" ")[1];
    console.log(classname);
    if (!this.state.SourceSelected && !this.state.DestSelected) return;
    if (classname === "source") {
      this.toggleSource(event);
    } else if (classname === "destination") {
      console.log("c");
      this.toggleDest(event);
    }
  };

  createNode = (
    row,
    col,
    cellSize,
    isSource,
    isDestination,
    isWall,
    isVisited,
    isShortest
  ) => {
    return {
      row: row,
      col: col,
      cellSize: cellSize,
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

    if (
      this.state.grid[r][c].isSource === "true" ||
      this.state.grid[r][c].isDestination === "true"
    )
      return;

    var toggleWall = "true";
    if (grid[r][c].isWall === "true") toggleWall = "false";

    grid[r][c].isWall = toggleWall

    this.setState({ grid: grid });
  };

  toggleSource = event => {
    const clickedNode = event.target;
    const id = clickedNode.id;
    const idSplit = id.split("-");

    const r = parseInt(idSplit[1]),
      c = parseInt(idSplit[2]);
    var grid = this.state.grid;

    var toggleSource = "true";

    if (grid[r][c].isSource === "true") toggleSource = "false";

    grid[r][c].isSource = toggleSource

    this.setState({ source: { x: r, y: c }, grid: grid });
  };

  toggleDest = event => {
    const clickedNode = event.target;
    const id = clickedNode.id;
    const idSplit = id.split("-");

    const r = parseInt(idSplit[1]),
      c = parseInt(idSplit[2]);
    var grid = this.state.grid;

    var toggleDest = "true";

    if (grid[r][c].isDestination === "true") toggleDest = "false";

    grid[r][c].isDestination = toggleDest

    this.setState({ destination: { x: r, y: c }, grid: grid });
  };

  initgrid = () => {
    var grid = [];
    for (var i = 0; i < this.state.rows; i++) {
      var row = [];
      for (var j = 0; j < this.state.cols; j++) {
        row.push(
          this.createNode(i, j, this.state.cellSize, "false", "false", "false", "false", "false")
        );
      }
      grid.push(row);
    }

    const sx = this.state.source.x;
    const sy = this.state.source.y;
    grid[sx][sy].isSource = "true"

    const dx = this.state.destination.x;
    const dy = this.state.destination.y;
    grid[dx][dy].isDestination = "true"

    return grid;
  };

  visualizeDijkstra = async () => {
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

    await this.animateVisnodes(visNodesList, shortestPath);
  };

  visualizeAstar = async () => {
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
    await this.animateVisnodes(visNodesList, shortestPath);
  };

  visualizeGreedy = async () => {
    const { grid, rows, cols, source, destination } = this.state;
    var greedy = new Greedy(
      grid,
      rows,
      cols,
      grid[source.x][source.y],
      grid[destination.x][destination.y]
    );

    var visNodesList = greedy.findShortestPath();
    var shortestPath = greedy.getShortestPathList();
    await this.animateVisnodes(visNodesList, shortestPath);
  };

  visualizeBFS = async () => {
    const { grid, rows, cols, source, destination } = this.state;
    var bfs = new BFS(
      grid,
      rows,
      cols,
      grid[source.x][source.y],
      grid[destination.x][destination.y]
    );

    var visNodesList = bfs.findPath();

    var shortestPath = bfs.getShortestPathList();
    await this.animateVisnodes(visNodesList, shortestPath);
  };

  visualizeDFS = async () => {
    const { grid, rows, cols, source, destination } = this.state;
    var dfs = new DFS(
      grid,
      rows,
      cols,
      grid[source.x][source.y],
      grid[destination.x][destination.y]
    );

    var visNodesList = dfs.findPath();
    var shortestPath = dfs.getShortestPathList();
    await this.animateVisnodes(visNodesList, shortestPath);
  };

  animateVisnodes = async (list, shortestPath) => {
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

  animateShortestPath = async shortestPath => {
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

  visualize = async algorithm => {
    if (this.runChecks(algorithm)) return true;
    if (this.state.isGridFilled) await this.clearGrid(true);

    this.setState({ IsRunning: true }, async () => {
      this.setState({ isGridFilled: true }, async () => {
        if (algorithm === "Dijkstra's") {
          await this.visualizeDijkstra();
        } else if (algorithm === "Astar") {
          await this.visualizeAstar();
        } else if (algorithm === "Greedy") {
          await this.visualizeGreedy();
        } else if (algorithm === "BFS") {
          await this.visualizeBFS();
        } else if (algorithm === "DFS") {
          await this.visualizeDFS();
        }
      });
    });
  };

  clearGrid = async (partialClear = false) => {
    if (this.state.IsRunning) return;

    var grid = this.initgrid();

    if (partialClear) {
      this.state.grid.forEach((row, r) => {
        row.forEach((node, c) => {
          if (node.isWall === "true") grid[r][c].isWall = "true";
        });
      });
    }

    this.setState({
      rows: this.state.rows,
      cols: this.state.cols,
      source: this.state.source,
      destination: this.state.destination,
      grid: grid,
      onMouseIsPressed: false,
      IsRunning: false,
      isGridFilled: false
    });
  };

  render() {
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
                    size={node.cellSize}
                    key={`${node.row}-${node.col}`}
                    isSource={node.isSource}
                    isDestination={node.isDestination}
                    isWall={node.isWall}
                    isVisited={node.isVisited}
                    isShortest={node.isShortest}
                    onMouseDown={this.onMouseDown}
                    onMouseEnter={this.onMouseEnter}
                    onMouseUp={this.onMouseUp}
                    onMouseLeave={this.onMouseLeave}
                  />
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
