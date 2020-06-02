import React, { useState } from 'react';
import './Register.css';
import { register } from '../../../utilities/api/usersApi';
import { Redirect, Link } from 'react-router-dom';

export function Register() {

    const [user, setRegisterUser] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const onInputChange = (event) => {
        event.persist();

        setRegisterUser((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));

        setErrorMessage('');
    }

    const onSubmit = (event) => {
        event.preventDefault();
        register(user).then(() => {
            setIsRegistered(true);
        }).catch((err) =>
            setErrorMessage(err.message));
    };

    return (
        <>
            {isRegistered && <Redirect to="/login" />}
            <div className="register-wrapper">
                <form className="register-form" onSubmit={onSubmit}>
                    {errorMessage && <span className="text-danger">{errorMessage}</span>}
                    <div className="form-group">
                        <label htmlFor="name">Name: </label>
                        <input type="text" name="name" id="name" className="form-control" onChange={onInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age: </label>
                        <input type="number" name="age" id="age" className="form-control" onChange={onInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" className="form-control" onChange={onInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" className="form-control" onChange={onInputChange} required />
                    </div>
                    <button className="btn btn-primary">Register</button>
                    <Link to="/login">Already have an account?</Link>
                </form>
            </div>
        </>
    )
}