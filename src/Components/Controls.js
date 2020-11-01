import React from 'react';
import {
	useGlobalPenToolContext,
	useGlobalPenToolActionsContext,
	useGlobalUndoContext,
	useGlobalUndoActionsContext,
} from '../Context/GlobalPenToolContext';

const Controls = () => {
  const setPenTool = useGlobalPenToolActionsContext();
	const setUndo = useGlobalUndoActionsContext();
	return (
		<div>
      <button 
      // onClick={penToolInit}
      >pencil</button>
			<button
				// onClick={() => {
				// 	history.undo();
				// }}
			>
				undo
			</button>
			<button
				// onClick={() => {
				// 	history.redo();
				// }}
			>
				redo
			</button>
		</div>
	);
};

export default Controls;
