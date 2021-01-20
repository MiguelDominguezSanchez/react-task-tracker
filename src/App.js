import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {
	const [showAddTask, setShowAddTask] = useState(true);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const fetchTasks = async () => {
			const tasksFromServer = await fetchTasks();
			setTasks(tasksFromServer);
		};
	});

	// Fetch Tasks
	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fetchTasks();
			setTasks(tasksFromServer);
		};

		getTasks();
	}, []);

	// Fetch Tasks
	const fetchTasks = async () => {
		const res = await fetch('http://localhost:5000/tasks');
		const data = await res.json();

		console.log(data);
		return data;
	};

	// Add Task
	const addTask = async (task) => {
		const res = await fetch('https://localhost:5000/tasks', {
			method: 'POST',
			headers: {
				'Content-type': 'applicatioin/json',
			},
			body: JSON.stringify(task),
		});

		const data = await res.json();

		setTasks([...tasks, data]);

		// const id = Math.floor(Math.random() * 10000) + 1;
		// const newTask = { id, ...task };
		// setTasks([...tasks, newTask]);
	};

	// Delete Task
	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'DELETE',
		});

		setTasks(tasks.filter((task) => task.id != id));
	};

	// Toogle Reminder
	const toggleReminder = (id) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, reminder: !task.reminder } : task
			)
		);
	};

	return (
		<div className="App">
			<Header
				onAdd={() => setShowAddTask(!showAddTask)}
				showAdd={showAddTask}
			/>

			{showAddTask && <AddTask onAdd={addTask} />}
			{tasks.length > 0 ? (
				<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
			) : (
				'No Tasks To Show'
			)}
		</div>
	);
}

export default App;
