import './App.css';
import React, {useState} from 'react';

function App() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState('');

	const handleAddTask = () => {
		if (newTask.trim() !== '') {
			fetch(//insert link to api,{
				method: 'POST',
				headers:{
					'content-type':'application/json'
				},
				body:JSON.stringify({ task: newTask}),
			})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					setTasks([...tasks, newTask]);
					setNewTask('');
				} else {
					console.error('Error Adding Task');
				}
			})
			.catch(error => {
				console.error('Error Adding Task', error);
			});
		}

	};

  return (
    <div className="App">
	  <h1>To-Do List</h1>
	  <div className='input-containers'>
	  <input 
	  type= 'text'
	  placeholder='Enter A New Task...'
	  value={newTask}
	  onChange={(e) => setNewTask(e.target.value)}
	  />
	  <button onClick = {handleAddTask}>Add</button>
	  </div>
	  <ul className='task-list'>
	  {tasks.map((task, index) => (
		  <li key={index}>{task}</li>
	  ))}
		  </ul>
		  </div>


  );
}

export default App;
