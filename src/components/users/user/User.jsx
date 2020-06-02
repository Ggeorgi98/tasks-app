import React, { Component } from 'react';
import { getUserById } from '../../../utilities/api/usersApi';
import { UserCard } from '../user-card/UserCard';
import { Redirect } from 'react-router-dom';
import { deleteUser } from '../../../utilities/api/usersApi';

export class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSuccessfullyDeleted: false,
            user: {}
        };
    }

    componentDidMount() {
        getUserById(this.props.computedMatch.params.id).then((response) => {
            this.setState({
                user: response.data
            });
        });
    }

    onUserDelete = (id) => {
        deleteUser(id).then(() => {
            this.setState({
                isSuccessfullyDeleted: true
            });
        }).catch((err) => console.error(err));
    }

    render() {
        return (
            <>
                {this.state.isSuccessfullyDeleted && <Redirect to="/users" />}
                <div className="single-user d-flex justify-content-center">
                    <UserCard user={this.state.user} onDelete={this.onUserDelete} />
                </div>
            </>
        )
    }
}