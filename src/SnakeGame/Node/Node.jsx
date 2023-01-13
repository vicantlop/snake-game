import "./Node.css"

const Node = (props) => {
  const { row, col, isStart, isFood } = props;

  const extraClassName = isStart ? "start" : isFood ? "food" : ""

  return <div id={`node-${row}-${col}`} className={`node ${extraClassName}`}></div>;
};

export default Node;
