import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState('');

  useEffect(() => {
    //fetch tasks from api and update the tasks state

    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('api');
      const data = await response.json();
      if (data.success){
        setTasks(data.tasks);
      } else {
        console.error('Error fetching tasks');
      }
    } catch (error) {
      console.error('Error Fetching tasks', error);
    }
  };

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

	const handleEditTask = (taskId, newTaskText) => {
		fetch('api', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({task:newTaskText}),
		})
.then(response => response.json())
.then(data => {
	if (data.success) {
		//refresh task list
	} else {
		console.error('Error updating task');
	}
})
.catch(error => {
	console.error('Error updating task', error);
});
};

const handleRemoveTask = (taskId) => {
	if (window.confirm('Are you sure you want to delete this task?')) {
		fetch('api', {
			method: 'DELETE',
		})
		.then(response => response.json())
		.then(data => {
		if (data.success) {
			//refresh task list
		} else {
			console.error('Error deleting task');
		} 
		})
		.catch(error => {
			console.error('Error deleting task', error);
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
	  {tasks.map((task) => (
		  <li key={task.id}>
      {tasks.text}
      <button
      className ='edit-button'
      onClick={() => {
        const newTaskText = prompt('Edit Task:', task.text);
        if (newTaskText !== null && newTaskText.trim() !== '') {
          handleEditTask(task.id, newTaskText);
        }
      }}
      >
      Edit
      </button>
      <button
      className ='delete-button'
      onClick={() => handleRemoveTask(task.lid)}
      >
      Delete
      </button>
      </li>
	  ))}
		  </ul>
		  </div>
  );
}

export default App;
