import React, { useState } from 'react';
import { saveTask, getTaskById } from '../../../utilities/api/tasksApi';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import './TaskEdit.css'
import { getLoggedUser } from '../../../utilities/api/usersApi';

export function TaskEdit(props) {
    const [currentTask, setCurrentTask] = useState({
        title: '',
        content: '',
        authorId: '',
        authorName: '',
        hours: ''
    });

    const [shouldRedirect, setShouldRedirect] = useState(false);

    const loggedUser = getLoggedUser();

    useEffect(() => {
        if (props.computedMatch.params.id) {
            getTaskById(props.computedMatch.params.id)
                .then((currentTask) => {
                    const task = currentTask.data;
                    if(task && task.authorId !== loggedUser.id && !loggedUser.isAdmin){
                        setShouldRedirect(true);
                    }
                    else{
                        setCurrentTask(task)
                    }                    
                });
        }
    }, [props.computedMatch.params.id]);

    const onInputChange = (event) => {
        event.persist();
        setCurrentTask((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onTaskSave = (event) => {
        event.preventDefault();
        if (!currentTask.status) {
            currentTask.status = 'Waiting for action'
        }
        saveTask(currentTask).then(() => {
            setShouldRedirect(true);
        }).catch((err) => console.error(err));
    }

    return (
        <>
            {shouldRedirect && <Redirect to='/tasks' />}
            <div className="task-edit-wrapper">
                <form onSubmit={onTaskSave} className="task-edit-form">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input className="form-control" type="text" id="title" name="title" onChange={onInputChange} value={currentTask.title} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea className="form-control" id="content" name="content" onChange={onInputChange} value={currentTask.content} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hours">Hours</label>
                        <input type="number" className="form-control" id="hours" name="hours" onChange={onInputChange} value={currentTask.hours} required />
                    </div>
                    <div className="form-group">
                        <select className="form-control" onChange={onInputChange} value={currentTask.status} id="status" name="status" required>
                            <option>Waiting for action</option>
                            <option>Finished</option>
                        </select>
                    </div>
                    <button className="btn btn-primary">Save</button>
                </form>
            </div>
        </>
    )
}