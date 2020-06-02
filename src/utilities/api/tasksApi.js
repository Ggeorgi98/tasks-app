import axios from 'axios';
import { getLoggedUser } from './usersApi';

const apiUrl = "http://localhost:3005";

export const TaskStatus = {
    WaitingForAction: 'Waiting for action',
    Finished: 'Finished'
}

export function getAllTasks(){
    return axios.get(`${apiUrl}/tasks`);
}

export async function getTasksByUserId(userId){
    const allTasks = (await getAllTasks()).data;

    return allTasks.filter(task => task.authorId === userId);
}

export function getMyTasks(){
    const loggedUserId = getLoggedUser().id;

    return getTasksByUserId(loggedUserId);
}

export function getTaskById(id){
    return axios.get(`${apiUrl}/tasks/${id}`);
}

export function saveTask(taskData){
    const loggedUser = getLoggedUser();

    if(taskData.id){
        return axios.put(`${apiUrl}/tasks/${taskData.id}`, taskData);
    }

    taskData.authorId = loggedUser.id;
    taskData.authorName = loggedUser.name;

    return axios.post(`${apiUrl}/tasks`, taskData);
}

export function deleteTask(taskId){
    return axios.delete(`${apiUrl}/tasks/${taskId}`);
}

export async function deleteTasksForUser(userId){
    const allTasks = (await getTasksByUserId(userId));

    allTasks.forEach(task => {
        deleteTask(task.id);
    });
}