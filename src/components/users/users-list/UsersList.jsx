import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, getLoggedUser } from '../../../utilities/api/usersApi';
import { UserCard } from '../user-card/UserCard';

export function UsersList() {
    const [users, setUsers] = useState([]);
    const loggedUser = getLoggedUser();

    useEffect(() => {
        getAllUsers().then((apiUsers) => {
            setUsers(apiUsers.data)
        });
    }, []);

    const onUserDelete = (id) => {
        deleteUser(id).then(() => {
            setUsers((prevState) => {
                return prevState.filter(u => u.id !== id);
            })
        })
            .catch((err) => console.error(err));
    }

    return (
        <div className="users-list d-flex">
            {users.filter(u => loggedUser && u.id !== loggedUser.id).map((user) => <UserCard user={user} key={user.id} onDelete={onUserDelete} />)}
        </div>
    );
}