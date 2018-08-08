import React from 'react'
import { Route } from 'react-router'
import MyReads from './components/MyReads'
import SearchBooks from './components/SearchBooks'
import './App.css'


class BooksApp extends React.Component {
    render() {
        return (
            <div className="app">
            <Route exact path="/" render={() =>
                <MyReads/>}
            />
            <Route path="/search" render={({history}) => 
                <SearchBooks
                    onSetShelf={() => {
                        history.push('/')
                    }}
                />}
            />
            </div>
        )
    }
}

export default BooksApp