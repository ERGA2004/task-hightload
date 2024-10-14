import React, { useState } from 'react';
import { createTaskGraphQL } from '../services/taskService';

const GraphQLTasks = () => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        deadlineDate: '',
        status: 'pending',
        userId: 1
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = await createTaskGraphQL(task);
        console.log('Task created:', newTask);
    };

    return (
        <div>
            <h2>Create Task (GraphQL)</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={task.title}
                    placeholder="Title"
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                />
                <input
                    type="text"
                    value={task.description}
                    placeholder="Description"
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                />
                <input
                    type="date"
                    value={task.deadlineDate}
                    onChange={(e) => setTask({ ...task, deadlineDate: e.target.value })}
                />
                <select
                    value={task.status}
                    onChange={(e) => setTask({ ...task, status: e.target.value })}
                >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
                <input
                    type="number"
                    value={task.userId}
                    onChange={(e) => setTask({ ...task, userId: parseInt(e.target.value, 10) })}
                />
                <button type="submit">Create Task</button>
            </form>
        </div>
    );
};

export default GraphQLTasks;
