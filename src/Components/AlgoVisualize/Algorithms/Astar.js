export default class Astar {
  constructor(grid, rows, cols, source, dest) {
    this.grid = grid;
    this.rows = rows;
    this.cols = cols;
    this.source = source;
    this.dest = dest;
    this.openSet = this.getNodes();
    this.closedSet = [];
    this.f = [];
    this.g = [];
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.col; j++) row.push(this.INFI);
      this.f.push(row);
      this.g.push(row);
    }
    this.g[this.source.row][this.source.col] = 0;
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

    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (i !== this.source.row || j !== this.source.col)
          this.grid[i][j].f = this.INFI;
        nodes.push(this.grid[i][j]);
      }
    }

    return nodes;
  }

  findShortestPath() {
    while (!!this.openSet.length) {}
  }
}
