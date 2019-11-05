export default class Greedy {
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
    this.vis = [];
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.cols; j++) row.push(false);
      this.vis.push(row);
    }
  }

  getHeuristicDistance(node) {
    return Math.sqrt(
      Math.pow(this.dest.row - node.row, 2) +
        Math.pow(this.dest.col - node.col, 2)
    );
  }

  getNodes() {
    this.grid[this.source.row][this.source.col].f = this.getHeuristicDistance(
      this.source
    );
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (i !== this.source.row || j !== this.source.col) {
          this.grid[i][j].f = this.getHeuristicDistance(this.grid[i][j]);
        }
      }
    }
    return [this.grid[this.source.row][this.source.col]];
  }

  heapify() {
    this.openSet.sort((node1, node2) => node1.f - node2.f);
  }

  findShortestPath() {
    while (this.openSet.length !== 0) {
      this.heapify();
      var node = this.openSet.splice(0, 1)[0];

      if (node.isWall === "true") continue;
      this.vis[node.row][node.col] = true;
      this.visitedNodes.push(node);
      if (node.row === this.dest.row && node.col === this.dest.col)
        return this.visitedNodes;
      this.updateNeighbours(node);
    }
    return this.visitedNodes;
  }

  doesExistNode(node) {
    this.visitedNodes.forEach((elem, index) => {
      if (node.row === elem.row && node.col === elem.col) return index;
    });
    return -1;
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
          if (this.vis[x + delx][y + dely]) return;
          let neighbour = this.grid[x + delx][y + dely];
          neighbour.prevNode = node;
          this.openSet.push(neighbour);
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
