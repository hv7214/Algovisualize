import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
  state = {
    algorithm: {
      dijkstra: false,
      astar: false
    }
  };

  visualize = () => {
    this.props.visualize(this.state.algorithm);
  };

  render() {
    return (
      <nav className="nav">
        <div className="navitems" id="homelink">
          AlgoVisualizer{" "}
        </div>
        <div className="navitems" id="dropdown">
          <button className="dropbtn btn">
            Algorithms <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a href="asd">Link 1</a>
            <a href="asd">Link 2</a>
            <a href="asd">Link 3</a>
          </div>
        </div>
        <div>
          {" "}
          <button className="btn visualize" onClick={() => this.visualize}>
            {" "}
            Visualize{" "}
          </button>{" "}
        </div>
      </nav>
    );
  }
}

export default Navbar;
