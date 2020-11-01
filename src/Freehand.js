import React, { useState, useRef, useEffect } from 'react';

const Freehand = () => {
	const canvasRef = useRef(null);
	const contextRef = useRef(null);
	const pencilRef = useRef(null);
	const undoRef = useRef(null);
	const redoRef = useRef(null);
	let isDrawing = false;

	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = window.innerWidth * 2;
		canvas.height = window.innerHeight * 2;
		canvas.style.width = `${window.innerWidth}px`;
		canvas.style.height = `${window.innerHeight}px`;

		const context = canvas.getContext('2d');
		context.scale(2, 2);
		context.lineCap = 'round';
		context.strokeStyle = 'black';
		context.lineWidth = 5;
		contextRef.current = context;
	}, []);

	var history = {
		redo_list: [],
		undo_list: [],
		saveState: function (canvas, list, keep_redo) {
			keep_redo = keep_redo || false;
			if (!keep_redo) {
				this.redo_list = [];
			}

			(list || this.undo_list).push(canvas.toDataURL());
		},
		undo: function (canvas, ctx) {
			this.restoreState(canvas, ctx, this.undo_list, this.redo_list);
		},
		redo: function (canvas, ctx) {
			this.restoreState(canvas, ctx, this.redo_list, this.undo_list);
		},
		restoreState: function (canvas, ctx, pop, push) {
			if (pop.length) {
				this.saveState(canvas, push, true);
				var restore_state = pop.pop();
				var img = new Element('img', { src: restore_state });
				img.onload = function () {
					ctx.clearRect(0, 0, 600, 400);
					ctx.drawImage(img, 0, 0, 600, 400, 0, 0, 600, 400);
				};
			}
		},
	};

	function init() {
		// this.canvas = canvasRef.current;
		// // this.canvas_coords = this.canvas.getCoordinates();
		// this.ctx = contextRef.current;
		// this.ctx.strokeColor = this.options.stroke_color;
		isDrawing = false;
		addCanvasEvents();
	}

	function addCanvasEvents() {
		// debugger
		canvasRef.current.addEventListener('mousedown', start);
		canvasRef.current.addEventListener('mousemove', stroke);
		canvasRef.current.addEventListener('mouseup', stop);
		// canvasRef.current.addEventListener('mouseout', stop);
	}

	function start({ offsetX, offsetY }) {
		// console.log(evt);
		// const { offsetX, offsetY } = nativeEvent;
		contextRef.current.beginPath();
		contextRef.current.moveTo(offsetX, offsetY);
		// console.log(contextRef.current);
		history.saveState(canvasRef.current);
		isDrawing = true;
	}

	function stroke({ offsetX, offsetY }) {
    if (!isDrawing) {
			return;
		}
		console.log(isDrawing);
			contextRef.current.lineTo(offsetX, offsetY);
			contextRef.current.stroke();
	}

	function stop() {
		if (isDrawing) {
			contextRef.current.closePath();
			isDrawing = false;
		}
	}

	return (
		<React.Fragment>
			<div id="controllers">
				<button ref={pencilRef} onClick={init}>
					pencil
				</button>
				<button ref={undoRef}>undo</button>
				<button ref={redoRef}>redo</button>
			</div>
			<canvas ref={canvasRef} />
		</React.Fragment>
	);
};

export default Freehand;
