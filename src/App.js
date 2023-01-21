import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { randomColor } from 'randomcolor';
import Draggable from 'react-draggable';
import './App.css';



function App() {

	const [task, setTask] = useState('');
	const [tasks, setTasks] = useState(
		JSON.parse(localStorage.getItem('tasks')) || []
	);

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks]);

	const newTask = () => {
		if (task.trim() !== '') {
			const newTask = {
				id: uuidv4(),
				task: task,
				color: randomColor({
					luminosity: 'light'
				}),
			}
			setTasks((tasks) => [...tasks, newTask]);
			setTask('')
		} else {
			alert('Enter your task please...');
			setTask('');
		}
	}

	const deleteNode = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	}

	const updatePos = (data, index) => {
		let newArray = [...tasks];
		newArray[index].defaultPos = { x: data.x, y: data.y };
		setTasks(newArray);
	}

	const keyPress = (e) => {
		const code = e.keyCode || e.which
		if (code === 13) {
			newTask()
		}
	}

	return (
   	<div className="App">
			<div className='wrapper'>
				<input
				value={task}
				type="text"
				placeholder='Enter your task...'
				onChange={ (e) => setTask(e.target.value) }
				onKeyPress={(e) => keyPress(e)}
			/>
				<button className='btn__add' onClick={ newTask }>Enter</button>
			</div>

			{
			tasks.map((task, index) =>{

				return (
					
					<Draggable 
						key={index}
						defaultPosition={task.defaultPos}
						onStop={(_, data) =>{
							updatePos(data, index);
						}
							
						}
					>

						<div className='todo__task' style={{backgroundColor: task.color}}>
							{(`${task.task}`)}
							<button
							className='btn__del'
							onClick={() => deleteNode(task.id)}
							>
								X
							</button>
						</div>
					</Draggable>
					)
				})
			
			}

   	</div>

		
	);
}


export default App;
