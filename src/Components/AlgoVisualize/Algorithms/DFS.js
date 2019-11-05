export default class DFS {
  constructor(grid, rows, cols, source, dest) {
    this.grid = grid;
    this.rows = rows;
    this.cols = cols;
    this.source = source;
    this.dest = dest;
    this.stack = [this.source];
    this.visitedNodes = [];
    this.isVisited = [];
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.cols; j++) row.push(false);
      this.isVisited.push(row);
    }
  }

  findPath() {
    this.isVisited[this.source.row][this.source.col] = true;
    while (this.stack.length !== 0) {
      var node = this.stack.splice(0, 1)[0];
      if (node.isWall === "true") continue;
      this.visitedNodes.push(node);
      if (node.row === this.dest.row && node.col === this.dest.col)
        return this.visitedNodes;
      this.searchNeighbours(node);
    }
    return this.visitedNodes;
  }

  searchNeighbours(node) {
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
          y + dely >= 0 &&
          Math.abs(delx - dely) === 1 &&
          !this.isVisited[x + delx][y + dely]
        ) {
          this.isVisited[node.row][node.col] = true;
          var neighbour = this.grid[x + delx][y + dely];
          neighbour.prevNode = node;
          this.stack.unshift(neighbour);
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
