import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
  state = {
    algorithm: "none"
  };

  visualize = () => {
    this.props.visualize(this.state.algorithm);
  };

  clear = () => {
    this.props.clear();
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
              onClick={() => this.setState({ algorithm: "dijkstra" })}
            >
              Dijkstra's
            </button>
            <button
              className="dropdownbtn"
              onClick={() => this.setState({ algorithm: "astar" })}
            >
              Astar
            </button>
          </div>
        </div>
        <div>
          {" "}
          <button className="navitems btn visualize" onClick={this.visualize}>
            {" "}
            Visualize{" "}
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
