import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../../utilities/api/usersApi';
import { getLoggedUser } from '../../utilities/api/usersApi';

export function Header() {
  const [isLoggedOut, setLogoutFlag] = useState(false);
  const onLogout = (event) => {
    logout();
    setLogoutFlag(true);
  }

  const loggedUser = getLoggedUser();

  return (
    <>
      {isLoggedOut && <Redirect to="/login" />}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">

            <li className="nav-item active">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to={`/users/${loggedUser?.id}`} className="nav-link">My Profile</Link>
            </li>
            {loggedUser && loggedUser.isAdmin &&
              <li className="nav-item">
                <Link to="/users" className="nav-link">Users</Link>
              </li>
            }
            {loggedUser && loggedUser.isAdmin &&
              <li className="nav-item">
                <Link to="/users/create" className="nav-link">Create User</Link>
              </li>
            }
            <li className="nav-item">
              <Link to="/tasks" className="nav-link">All Tasks</Link>
            </li>
            <li className="nav-item">
              <Link to="/tasks/my-tasks" className="nav-link">My Tasks</Link>
            </li>
            <li className="nav-item">
              <Link to="/task/create" className="nav-link">Create Task</Link>
            </li>
          </ul>
          <span className="btn logout-btn" onClick={onLogout}>Log out</span>
        </div>
      </nav>
    </>
  );
}