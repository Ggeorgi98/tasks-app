import React, { useState } from 'react';
import { useEffect } from 'react';
import { getMyTasks, deleteTask } from '../../../utilities/api/tasksApi';
import { TaskCard } from '../task-card/TaskCard'

export function MyTasks() {
    const [personalTasks, setPersonalTasks] = useState([]);

    useEffect(() => {
        getMyTasks().then((tasks) => {
            setPersonalTasks(tasks);
        });
    }, []);

    const onDelete = (id) => {
        deleteTask(id).then(() => {
            setPersonalTasks((prevState) => {
                return prevState.filter(n => n.id !== id);
            });
        });
    }

    return (
        <div className="my-tasks-wrapper d-flex flex-wrap">
            {personalTasks.map(task => <TaskCard task={task} key={task.id} onDeleteClick={onDelete} />)}
        </div>
    );
}