import React, { useState, useEffect } from 'react';
import { getUserById, editOfUser, saveUser } from '../../../utilities/api/usersApi';
import { Redirect } from 'react-router-dom';
import './UserEdit.css'

export function UserEdit(props) {

    const [editUser, setEditUser] = useState({
        name: '',
        age: 0,
        email: '',
        password: '',
        isAdmin: false,
        isActive: false
    });

    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (props.computedMatch.params.id) {
            getUserById(props.computedMatch.params.id)
                .then((currentUser) => {
                    setEditUser(currentUser.data)
                });
        }
    }, []);


    const onInputChange = (event) => {
        event.persist();
        setEditUser((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.name === "isAdmin" || event.target.name === "isActive" ? 
                event.target.checked : event.target.value
        }));

        if(errorMessage){
            setErrorMessage('');
        }        
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        saveUser(editUser).then(() => {
            setShouldRedirect(true);
        }).catch((err) => setErrorMessage(err.message));
    }

    return (
        <>
            {shouldRedirect && <Redirect to='/users' />}
            <div className="user-edit-wrapper">
                <form className="user-edit-form" onSubmit={onFormSubmit}>
                {errorMessage && <span className="text-danger">{errorMessage}</span>}
                    <div className="form-group">
                        <label htmlFor="name">Name: </label>
                        <input type="text" name="name" id="name" className="form-control" onChange={onInputChange} value={editUser.name} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age: </label>
                        <input type="number" name="age" id="age" className="form-control" onChange={onInputChange} value={editUser.age} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" className="form-control" onChange={onInputChange} value={editUser.email} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" className="form-control" onChange={onInputChange} value={editUser.password} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="isActive">Is Active: </label>
                        <input type="checkbox" name="isActive" id="isActive" className="form-control" onChange={onInputChange} checked={editUser.isActive} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="isAdmin">Is Admin: </label>
                        <input type="checkbox" name="isAdmin" id="isAdmin" className="form-control" onChange={onInputChange} checked={editUser.isAdmin} />
                    </div>
                    <button className="btn btn-primary">Save</button>
                </form>
            </div>
        </>
    )
}