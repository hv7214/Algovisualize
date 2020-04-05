import React, { Component } from "react";
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import "./Navbar.css";
import 'rc-slider/assets/index.css';

class Navbar extends Component {
  state = {
    algorithm: "none",
    visualizebtn: "Visualize",
    isRunning: false,
    speedValue: 5,
    speedName: "Fast"
  };

  visualize = () => {
    this.setState({ isRunning: true }, () => console.log(this.state.isRunning));
    this.props.visualize(this.state.algorithm);
  };

  clear = () => {
    this.props.clear();
  };

  changeNavState = algorithm => {
    this.setState({ algorithm: algorithm });
    this.setState({ visualizebtn: "Visualize " + algorithm });
  };

  render() {
    const Handle = Slider.Handle;
    const handle = (props) => {
    var { value, dragging, index, ...restProps } = props;
    // custom
    if(value === 0) { 
      value = "Fast"
    }
    else if (value === 50) { 
      value = "Normal" 
    }  
    else { 
      value = "Slow"
    }
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
    };

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
        <button className="navitems btn visualize" onClick={this.visualize}>
          {this.state.visualizebtn}
        </button>
        <button className="navitems btn" onClick={this.clear}>
          Clear
        </button>
        <div className="navitems slider">
          <Slider handle={handle} step="50" onChange={this.props.toggleSpeed}/>
        </div>
      </nav>
    );
  }
}

export default Navbar;
