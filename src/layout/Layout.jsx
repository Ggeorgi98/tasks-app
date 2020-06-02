import React, { Component } from 'react';
import { Main } from './main/Main';
import { Header } from './header/Header';
import { Footer } from './footer/Footer';

export class Layout extends Component {
    render() {
        return (
            <div className="layout">
                <Header></Header>
                <Main></Main>
                <Footer></Footer>
            </div>
        );
    }
}