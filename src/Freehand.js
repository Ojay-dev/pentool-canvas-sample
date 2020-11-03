import React from "react";

function Freehand(props) {
  const [isStarted, setStarted] = React.useState(false);

  const start = () => setStarted(true);

  return <div>{isStarted ? "Starting..." : "Not Starting.."}</div>;
}

export default Freehand;
