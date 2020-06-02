import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../../utilities/api/usersApi';

const cardStyle = {
    width: '18rem'
}

export function UserCard({ user, onDelete }) {
    const loggedUser = getLoggedUser();
    return (
        <div className="card m-3" style={cardStyle}>
            <img className="card-img-top" src={user.picture} alt={user.name} />
            <div className="card-body">
                <h5 className="card-title"><Link to={`/users/${user.id}`}>Name: {user.name}</Link></h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Age: {user.age}</li>
                <li className="list-group-item">Email: {user.email}</li>
            </ul>
            {loggedUser.isAdmin &&
                <div className="card-body">
                    <Link to={`/users/edit/${user.id}`}>Edit</Link>
                    {loggedUser.id !== user.id &&
                        <div className="cursor-pointer" onClick={() => onDelete(user.id)}>
                            Delete
                        </div>
                    }
                </div>
            }
        </div>
    );
}