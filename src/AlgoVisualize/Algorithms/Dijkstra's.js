export default class Dijkstra {
  constructor(grid, rows, cols, source, dest) {
    this.INFI = 1e5;
    this.grid = grid; // 1d array
    this.rows = rows;
    this.cols = cols;
    this.source = source;
    this.dest = dest;
    // this.vis = [rows][cols];
    // this.vis = this.vis.map(row => { return row.map(node => {return false} ) });
    this.unvisnodes = this.getNodes();
    this.dist = [];
    for (var i = 0; i < this.rows; i++) {
      var row = [];
      for (var j = 0; j < this.cols; j++) row.push(this.INFI);
      this.dist.push(row);
    }
    this.dist[source.row][source.col] = 0;
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
    // this.grid.forEach(row =>          // giving 1051 length instead of 1050
    //   row.forEach(node => {
    //     nodes.push(node);
    //   })
    // );
    console.log(nodes);
    return nodes;
  }

  heapify() {
    this.unvisnodes.sort((node1, node2) => node1.dist - node2.dist);
  }

  findShortestPath() {
    var runtimepreventer = 0;
    while (!!this.unvisnodes) {
      runtimepreventer++;
      if (runtimepreventer > 10000) return;

      this.heapify();

      var node = this.unvisnodes.splice(0, 0);
      if (node.isWall === "true") continue;

      this.updateNeighbours(node);
      this.visnodesinorder.push(node);

      if (node === this.dest || node.dist === this.INFI)
        return this.visnodesinorder;
    }
  }

  doesExistNode(node) {
    this.unvisnodes.forEach((elem, index) => {
      if (node === elem) return index;
    });
    return -1;
  }

  updateNeighbours(node) {
    const dx = [1, -1, 0];
    const dy = [1, -1, 0];

    dx.forEach(delx => {
      dy.forEach(dely => {
        const x = node.x,
          y = node.y;
        if (
          x + dx >= 0 &&
          x + dx < this.rows &&
          y + dy < this.cols &&
          y + dy >= 0
        ) {
          if (this.dist[x + dx][y + dy] > node.dist + 1) {
            const neighbour = this.grid[x + dx][y + dy];
            neighbour.dist = this.dist[x + dx][y + dy]; // optional
            const index = this.doesExistNode(neighbour);

            if (index !== -1) {
              this.unvisnodes.splice(index, index);
            }
            this.dist[x + dx][y + dy] = node.dist + 1;
            neighbour.dist = this.dist[x + dx][y + dy];
            this.unvisnodes.push(neighbour);
          }
        }
      });
    });
  }
}
