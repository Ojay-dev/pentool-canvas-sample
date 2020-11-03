import React, { useRef, useEffect } from 'react';
import {
	useGlobalPenToolActionsContext,
	useGlobalUndoActionsContext,
	useGlobalRedoActionsContext,
} from '../Context/GlobalPenToolContext';

function PenToolCanvas(props) {
	const canvasRef = useRef(null);
	const contextRef = useRef(null);
	const setPenTool = useGlobalPenToolActionsContext();
	const setUndo = useGlobalUndoActionsContext();
	const setRedo = useGlobalRedoActionsContext();
	let isDrawing = false;
	let plots = [];

	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		canvas.style.width = `${window.innerWidth}px`;
		canvas.style.height = `${window.innerHeight}px`;

		const context = canvas.getContext('2d');
		// context.scale(2, 2);
		context.lineCap = 'round';
		context.strokeStyle = '#FF9900';
		context.lineWidth = 5;
		contextRef.current = context;

		setPenTool({ init: penToolInit });
		setUndo({ undo });
		setRedo({ redo });
	}, []);

	let redo_list = [];
	let undo_list = [];

	function saveState(canvas, list, keep_redo) {
		keep_redo = keep_redo || false;
		if (!keep_redo) {
			redo_list = [];
		}

		(list || undo_list).push(canvas.toDataURL());
	}

	function undo() {
		restoreState(undo_list, redo_list);
	}

	function redo() {
		restoreState(redo_list, undo_list);
	}

	function restoreState(pop, push) {
		if (pop.length) {
			saveState(canvasRef.current, push, true);
			var restore_state = pop.pop();
			// var img = new Element('img', { src: restore_state });
			var img = new Image();
			img.src = restore_state;
			img.onload = function () {
				contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
				contextRef.current.drawImage(
					img,
					0,
					0,
					canvasRef.current.width,
					canvasRef.current.height,
					0,
					0,
					canvasRef.current.width,
					canvasRef.current.height
				);
			};
		}
	}

	function penToolInit() {
		// debugger;
		console.log(canvasRef.current.height);

		isDrawing = false;
		addCanvasEvents();
	}

	function addCanvasEvents() {
		// debugger
		canvasRef.current.addEventListener('mousedown', startDrawing);
		canvasRef.current.addEventListener('mousemove', draw);
		canvasRef.current.addEventListener('mouseup', finishDrawing);
		canvasRef.current.addEventListener('mouseout', finishDrawing);
	}

	const startDrawing = ({ offsetX, offsetY, layerX, layerY }) => {
		var x = offsetX;
		var y = offsetY;
		plots.push({ x, y });
		drawOnCanvas(plots);
	};

	const drawOnCanvas = (plots) => {
		contextRef.current.beginPath();
		contextRef.current.moveTo(plots[plots.length - 1].x, plots[plots.length - 1].y);
		saveState(canvasRef.current);
		isDrawing = true;
	};

	const finishDrawing = () => {
    contextRef.current.closePath();
    plots = [];
		isDrawing = false;
	};

	const draw = ({ offsetX, offsetY }) => {
		if (!isDrawing) {
			return;
		}
		contextRef.current.lineTo(offsetX, offsetY);
		contextRef.current.stroke();
	};

	return (
		<>
			{/* <div>
      <button onClick={penToolInit}>pencil</button>
      <button onClick={undo}>undo</button>
      <button
      // onClick={() => {
      // 	history.redo();
      // }}
      >
        redo
      </button>
    </div> */}
			<canvas ref={canvasRef} style={{ position: 'absolute', zIndex: 999 }} />
		</>
	);
}

export default PenToolCanvas;
