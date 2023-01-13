import { useState, useEffect } from "react";
import Node from "./Node/Node";
import "./SnakeGame.css";

const randomNum = (num) => {
  return Math.floor(Math.random() * num)
}

const SnakeGame = () => {
  const [grid, setGrid] = useState([]);
  const [direction, setDirection] = useState("");
  const [startNode, setStartNode] = useState([randomNum(15), randomNum(50)]);
  const [foodNode, setFoodNode] = useState([randomNum(15), randomNum(50)]);
  const [startOnFood, setStartOnFood] = useState(startNode.row === foodNode.row)

  const initGrid = () => {
    // console.log(startNode);
    let grid = [];
    for (let row = 0; row < 15; row++) {
      let currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(row, col));
      }
      grid.push(currentRow);
    }
    setGrid(grid);
  };

  const createNode = (row, col) => {
    return {
      row,
      col,
      isStart: row === startNode[0] && col === startNode[1],
      isFood: row === foodNode[0] && col === foodNode[1],
    };
  };

  useEffect(initGrid, [startNode]);

  const handleKeyDown = (e) => {
    if ((e.keyCode === 38 || e.keyCode === 87) && startNode[0] > 0 && direction !== "down") {
      setDirection("up");
    }
    if ((e.keyCode === 39 || e.keyCode === 68) && startNode[1] < 49 && direction !== "left") {
      setDirection("right");
    }
    if ((e.keyCode === 40 || e.keyCode === 83) && startNode[0] < 14 && direction !== "up") {
      setDirection("down");
    }
    if ((e.keyCode === 37 || e.keyCode === 65) && startNode[1] > 0 && direction !== "right"){
      setDirection("left");
    }
  };

  const handleKeyUp = () => {
    // console.log(direction);
    if(direction === "up" && startNode[0] > 0) {
      setTimeout (() => {
          setStartNode([startNode[0] - 1, startNode[1]])
          console.log("up")
      }, 1000)
    }
    if(direction === "right" && startNode[1] < 49) {
      setTimeout (() => {
          setStartNode([startNode[0], startNode[1] + 1])
          console.log("right")
      }, 1000)
    }
    if(direction === "down" && startNode[0] < 14) {
      setTimeout (() => {
          setStartNode([startNode[0] + 1, startNode[1]])
          console.log("down")
      }, 1000)
    }
    if(direction === "left" && startNode[1] > 0) {
      setTimeout (() => {
          setStartNode([startNode[0], startNode[1] - 1])
          console.log("left")
      }, 1000)
    }
  };

  useEffect(handleKeyUp, [startNode])

  return (
    <div className="grid">
      <input type="text" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
      {grid.map((row, rowIdx) => {
        return (
          <div className="row" key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { row, col, isStart, isFood } = node;
              return (
                <Node
                  key={nodeIdx}
                  row={row}
                  col={col}
                  isStart={isStart}
                  isFood={isFood}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default SnakeGame;
