export default class Dijkstra {
  constructor(grid, rows, cols, source, dest) {
    this.INFI = 1e5;
    this.grid = grid;
    this.rows = rows;
    this.cols = cols;
    this.source = source;
    this.dest = dest;
    this.unvisnodes = this.getNodes();
    this.visitedNodes = [];
  }

  getNodes() {
    var nodes = [];

    this.grid[this.source.row][this.source.col].dist = 0;

    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (i !== this.source.row || j !== this.source.col)
          this.grid[i][j].dist = this.INFI;
        nodes.push(this.grid[i][j]);
      }
    }

    return nodes;
  }

  heapify() {
    this.unvisnodes.sort((node1, node2) => node1.dist - node2.dist);
  }

  findShortestPath() {
    while (this.unvisnodes.length !== 0) {
      this.heapify();
      var node = this.unvisnodes.splice(0, 1)[0];
      if (node.isWall === "true") continue;
      if (node.dist === this.INFI) return this.visitedNodes;

      this.visitedNodes.push(node);
      this.updateNeighbours(node);

      if (node.row === this.dest.row && node.col === this.dest.col)
        return this.visitedNodes;
    }
  }

  doesExistNode(node) {
    this.unvisnodes.forEach((elem, index) => {
      if (node.row === elem.row && node.col === elem.col) return index;
    });
    return -1;
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

          if (neighbour.dist > node.dist + deld) {
            const index = this.doesExistNode(neighbour);
            neighbour.prevNode = node;
            neighbour.dist = node.dist + deld;
            index !== -1
              ? (this.unvisnodes[index] = neighbour)
              : this.unvisnodes.push(neighbour);
            this.grid[x + delx][y + dely] = neighbour;
          }
        }
      });
    });
  }
}
