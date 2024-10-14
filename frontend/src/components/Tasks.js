import React, { useEffect, useState } from 'react';
import { getTasks } from '../services/taskService';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const tasksData = await getTasks();
            setTasks(tasksData);
        };
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Tasks (REST API)</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.title} - {task.description} (Status: {task.status})</li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
