import React from 'react';
import { Link } from 'react-router-dom';
import { TaskStatus } from '../../../utilities/api/tasksApi';
import { getLoggedUser } from '../../../utilities/api/usersApi';

const cardStyle = {
    width: '18rem'
}

const buttonStyles = {
    cursor: 'pointer'
}

export function TaskCard({ task, onDeleteClick }) {
    const loggedUser = getLoggedUser();
    let taskClassByType = "card text-white m-3 ";
    switch(task.status){
        case TaskStatus.WaitingForAction:
            taskClassByType += "bg-secondary";
            break;
        case TaskStatus.Finished:
            taskClassByType += "bg-success";
            break;
        default:
            taskClassByType += "bg-primary";
            break;
    }

    return (
        <div className={taskClassByType} style={cardStyle}>
            <div className="card-header">
                {task.title}
                {(loggedUser.isAdmin || loggedUser.id === task.authorId) &&
                    <div className="d-flex justify-content-center">
                        <span style={buttonStyles} className="mr-3"><Link to={`/task/edit/${task.id}`} >Edit</Link></span>
                        <span style={buttonStyles} onClick={() => onDeleteClick(task.id)}>Delete</span>
                    </div>
                }
            </div>
            <div className="card-body">
                <p className="card-text">{task.content}</p>
            </div>
            <div className="card-footer bg-transparent">
                <div>
                    Status: {task.status}
                </div>
                <div>
                    Author: {task.authorName}
                </div>
                <div>
                    Hours: {task.hours}
                </div>
            </div>
        </div>
    );
}