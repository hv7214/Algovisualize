import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
  state = {
    algorithm: "none",
    visualizebtn: "Visualize",
    isRunning: false
  };

  visualize = () => {
    this.setState({ isRunning: true }, () => console.log(this.state.isRunning));
    this.props.visualize(this.state.algorithm, () => {
      console.log("Change");
    });
  };

  clear = () => {
    this.props.clear();
  };

  changeNavState = algorithm => {
    this.setState({ algorithm: algorithm });
    this.setState({ visualizebtn: "Visualize " + algorithm });
  };

  render() {
    return (
      <nav className="nav">
        <div className="navitems" id="homelink">
          AlgoVisualizer{" "}
        </div>
        <div className="navitems" id="dropdown">
          <button className="btn">
            Algorithms <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <button
              className="dropdownbtn"
              onClick={() => this.changeNavState("Dijkstra's")}
            >
              Dijkstra's
            </button>
            <button
              className="dropdownbtn"
              onClick={() => this.changeNavState("Astar")}
            >
              Astar
            </button>
            <button
              className="dropdownbtn"
              onClick={() => this.changeNavState("Greedy")}
            >
              Greedy
            </button>
            <button
              className="dropdownbtn"
              onClick={() => this.changeNavState("BFS")}
            >
              BFS
            </button>
            <button
              className="dropdownbtn"
              onClick={() => this.changeNavState("DFS")}
            >
              DFS
            </button>
          </div>
        </div>
        <div>
          {" "}
          <button className="navitems btn visualize" onClick={this.visualize}>
            {" "}
            {this.state.visualizebtn}
          </button>
          <button className="navitems btn" onClick={this.clear}>
            {" "}
            Clear
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
