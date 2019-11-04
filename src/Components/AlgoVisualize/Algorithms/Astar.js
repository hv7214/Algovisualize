export default class Astar {
  constructor(grid, rows, cols, source, dest) {
    this.INFI = 1e5;
    this.grid = grid;
    this.rows = rows;
    this.cols = cols;
    this.source = source;
    this.dest = dest;
    this.openSet = this.getNodes();
    this.visitedNodes = [];
    this.shortestPath = [];
  }

  getHeuristicDistance(node) {
    return Math.sqrt(
      Math.pow(this.dest.row - node.row, 2) +
        Math.pow(this.dest.col - node.col, 2)
    );
  }

  getNodes() {
    var nodes = [];

    this.grid[this.source.row][this.source.col].f = this.getHeuristicDistance(
      this.source
    );
    this.grid[this.source.row][this.source.col].g = 0;

    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (i !== this.source.row || j !== this.source.col) {
          this.grid[i][j].f = this.INFI;
          this.grid[i][j].g = this.INFI;
        }
        nodes.push(this.grid[i][j]);
      }
    }
    return nodes;
  }

  heapify() {
    this.openSet.sort((node1, node2) => node1.f - node2.f);
  }

  findShortestPath() {
    while (this.openSet.length !== 0) {
      this.heapify();
      var node = this.openSet.splice(0, 1)[0];
      if (node.isWall === "true") continue; // checking for wall
      if (node.f === this.INFI) return this.visitedNodes;
      this.visitedNodes.push(node);
      if (node.row === this.dest.row && node.col === this.dest.col)
        return this.visitedNodes;
      this.updateNeighbours(node);
    }
  }

  updateNeighbours(node) {
    const dx = [1, -1, 0];
    const dy = [1, -1, 0];

    dx.forEach(delx => {
      dy.forEach(dely => {
        const x = node.row,
          y = node.col;

        if (
          x + delx >= 0 &&
          x + delx < this.rows &&
          y + dely < this.cols &&
          y + dely >= 0
        ) {
          const neighbour = this.grid[x + delx][y + dely];
          const deld = Math.abs(delx) === 1 && Math.abs(dely) === 1 ? 1.4 : 1;

          if (neighbour.g > node.g + deld) {
            neighbour.prevNode = node;
            neighbour.g = node.g + deld;
            neighbour.f = neighbour.g + this.getHeuristicDistance(neighbour);
            this.grid[x + delx][y + dely] = neighbour;
          }
        }
      });
    });
  }

  getShortestPathList() {
    var dest = this.grid[this.dest.row][this.dest.col];
    var shortestPath = [];
    while (dest !== null && dest !== undefined) {
      shortestPath.push(dest);
      dest = dest.prevNode;
    }
    shortestPath.reverse();
    return shortestPath;
  }
}
