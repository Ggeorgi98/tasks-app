import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthenticatedRoute } from '../../utilities/guards/AuthenticatedRoute';
import { UsersList } from '../../components/users/users-list/UsersList';
import { User } from '../../components/users/user/User';
import { UserEdit } from '../../components/users/user-edit/UserEdit';
import { TasksList } from '../../components/tasks/tasks-list/TasksList';
import { TaskEdit } from '../../components/tasks/task-edit/TaskEdit';
import { MyTasks } from '../../components/tasks/my-tasks/MyTasks';

export function Main() {
    return (
        <div className="main-content">
            <Switch>
                <AuthenticatedRoute exact path="/users" admin={true} component={UsersList} />
                <AuthenticatedRoute exact path="/users/create" admin={true} component={UserEdit} />
                <AuthenticatedRoute exact path="/users/:id" myprofileonly={true} component={User} />
                <AuthenticatedRoute exact path="/users/edit/:id" admin={true} component={UserEdit} />
                <AuthenticatedRoute exact path="/tasks" component={TasksList} />
                <AuthenticatedRoute exact path="/task/create" component={TaskEdit} />
                <AuthenticatedRoute exact path="/task/edit/:id" component={TaskEdit} />
                <AuthenticatedRoute exact path="/tasks/my-tasks" component={MyTasks} />
            </Switch>
        </div>
    );
}