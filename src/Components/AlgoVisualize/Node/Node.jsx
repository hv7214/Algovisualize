import React, { Component } from "react";
import "./Node.css";

class Node extends Component {
  render() {
    const {
      col,
      row,
      isSource,
      isDestination,
      isWall,
      isVisited,
      isShortest,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
      onMouseLeave
    } = this.props;
    var className = "";

    if (isSource === "true") className = "source";
    else if (isDestination === "true") className = "destination";
    else if (isWall === "true") className = "wall";
    else if (isVisited === "true") className = "vis";
    else if (isShortest === "true") className = "shortest";

    return (
      <div
        className={`node ${className}`}
        id={`node-${row}-${col}`}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      ></div>
    );
  }
}

export default Node;
