import axios from 'axios';
import { deleteTasksForUser } from './tasksApi';

const apiUrl = "http://localhost:3005"

export function getLoggedUser(){
    return JSON.parse(localStorage.getItem('loggedUser'));
}

export function getAllUsers(){
    return axios.get(`${apiUrl}/users`);
}

export function getUserById(id){
    return axios.get(`${apiUrl}/users/${id}`);
}

export async function register(userData){
    const users = (await getAllUsers()).data;

    if(users.find(u => u.email === userData.email)){
        throw new Error('Email already exists!');
    }

    userData = {
        ...userData,
        isActive: true,
        isAdmin: false,
        picture: "https://picsum.photos/200/300?random=1",
    }
    return axios.post(`${apiUrl}/users`, userData);
}

export async function login(userData){
    const users = (await getAllUsers()).data;

    const loggedUser = users.find(u => u.email === userData.email 
        && u.password.toString() === userData.password);

    if(loggedUser){
        if(!loggedUser.isActive){
            throw new Error('You are not active user');
        }

        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        return;
    }
    
    throw new Error('Incorrect username or password');
}

export function logout(){
    localStorage.removeItem('loggedUser');
}

export async function saveUser(userData){
    const users = (await getAllUsers()).data;
    if(userData.id){
        if(users.find(u => u.email === userData.email 
            && userData.id !== u.id)){
            throw new Error('Email already exists!');
        }
    
        return axios.put(`${apiUrl}/users/${userData.id}`, userData);
    }

    if(users.find(u => u.email === userData.email)){
        throw new Error('Email already exists!');
    }

    userData = {
        ...userData,       
        picture: "https://picsum.photos/200/300?random=1",
    }

    return axios.post(`${apiUrl}/users`, userData);    
}

export function deleteUser(id){
    deleteTasksForUser(id);
    return axios.delete(`${apiUrl}/users/${id}`);
}