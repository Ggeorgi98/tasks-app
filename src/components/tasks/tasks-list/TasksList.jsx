import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllTasks, deleteTask } from '../../../utilities/api/tasksApi';
import { TaskCard } from '../task-card/TaskCard';

export function TasksList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getAllTasks()
            .then((result) => {
                setTasks(result.data);
            });
    }, [])

    const onDelete = (id) => {
        deleteTask(id).then(() => {
            setTasks((prevState) => {
                return prevState.filter(n => n.id !== id);
            });
        });
    }

    return (
        <div className="tasks-list-wrapper d-flex flex-wrap">
            {tasks.map(task => <TaskCard task={task} key={task.id} onDeleteClick={onDelete} />)}
        </div>
    );
}