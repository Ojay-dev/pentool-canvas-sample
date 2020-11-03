import React from "react";
import {
  useGlobalPenToolContext,
  useGlobalUndoContext,
  useGlobalRedoContext,
} from "../Context/GlobalPenToolContext";

const Controls = () => {
  const {init} = useGlobalPenToolContext();
  const {undo} = useGlobalUndoContext();
  const {redo} = useGlobalRedoContext();

  // console.log(isPenTool.init);

  return (
    <div>
      <button onClick={init}>pencil</button>
      <button onClick={undo}>undo</button>
      <button onClick={redo}>redo</button>
    </div>
  );
};

export default Controls;
