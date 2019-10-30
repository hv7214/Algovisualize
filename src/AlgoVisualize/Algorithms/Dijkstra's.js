export default class Dijkstra {
  constructor(grid, rows, cols, source, dest) {
    this.INFI = 1e5;
    this.grid = grid;
    this.rows = rows;
    this.cols = cols;
    this.source = source;
    this.dest = dest;
    // this.vis = [rows][cols];
    // this.vis = this.vis.map(row => { return row.map(node => {return false} ) });
    this.unvisnodes = this.getNodes();
    this.visnodesinorder = [];
  }

  getNodes() {
    var nodes = [];

    this.grid = this.grid.map(row => {
      return row.map(node => {
        node.dist = this.INFI;
        return node;
      });
    });

    this.grid[this.source.row][this.source.col].dist = 0;

    for (var i = 0; i < this.rows; i++) {
      var row = this.grid[i];
      for (var j = 0; j < this.cols; j++) {
        nodes.push(row[j]);
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
      if (node.dist === this.INFI) return;

      this.updateNeighbours(node);
      this.visnodesinorder.push(node);

      if (node.row === this.dest.row && node.col === this.dest.col)
        return this.visnodesinorder;
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

          if (neighbour.dist > node.dist + 1) {
            const index = this.doesExistNode(neighbour);
            neighbour.prevNode = node;
            neighbour.dist = node.dist + 1;
            this.unvisnodes[index] = neighbour;
            this.grid[x + delx][y + dely] = neighbour;
          }
        }
      });
    });
  }
}
