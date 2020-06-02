import React from 'react';
import { getLoggedUser } from '../api/usersApi';
import { Redirect } from 'react-router-dom';

export function AuthenticatedRoute(props) {
    const loggedUser = getLoggedUser();

    if(props.admin && loggedUser && loggedUser.isAdmin){
        return <props.component {...props} />
    }

    if(!props.admin && loggedUser){
        if(props.myprofileonly && loggedUser.id === props.computedMatch.params.id){
            return <props.component {...props} />
        }
        else if(props.myprofileonly && loggedUser.id !== props.computedMatch.params.id && !loggedUser.isAdmin){
            return <Redirect to='/' />
        }
        
        return <props.component {...props} />
    }

    return <Redirect to='/login' />
}