import React, { useRef, useEffect, useState } from 'react';
import { useGlobalUndoContext, useGlobalUndoActionsContext } from '../Context/GlobalPenToolContext';

function PenToolCanvas(props) {
	const canvasRef = useRef(null);
	const contextRef = useRef(null);
	const [undoList, setUndoList] = useState([]);
	const [redoList, setRedoList] = useState([]);
	const undo = useGlobalUndoContext();
	const setUndo = useGlobalUndoActionsContext();
	let isDrawing = false;

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
		penToolInit();
	}, []);

	const history = {
		redo_list: [],
		undo_list: [],
		saveState: function (canvas, list, keep_redo) {
			keep_redo = keep_redo || false;
			if (!keep_redo) {
				this.redo_list = [];
			}

			(list || this.undo_list).push(canvas.toDataURL());
		},
		undo: function () {
			this.restoreState(this.undo_list, this.redo_list);
		},
		redo: function () {
			this.restoreState(this.redo_list, this.undo_list);
		},
		restoreState: function (pop, push) {
			if (pop.length) {
				this.saveState(canvasRef.current, push, true);
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
		},
	};

	if (undo) {
		debugger;
		history.undo();
		setUndo(false);
	}

	// if (redo) {
	//   history.redo();
	//   setRedo(false);
	// }

	function penToolInit() {
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

	const startDrawing = ({ offsetX, offsetY }) => {
		contextRef.current.beginPath();
		contextRef.current.moveTo(offsetX, offsetY);
		history.saveState(canvasRef.current);
		isDrawing = true;
	};

	const finishDrawing = () => {
		contextRef.current.closePath();
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
			<canvas ref={canvasRef} style={{ position: 'absolute', zIndex: 999 }} />
		</>
	);
}

export default PenToolCanvas;
