import React from 'react'
import { Route } from 'react-router'
import MyReads from './MyReads'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
    state = {
        books: [],
        shelves: [
            {
                name: 'currentlyReading',
                title: 'Currently Reading'
            },
            {
                name: 'wantToRead',
                title: 'Want to Read'
            },
            {
                name: 'read',
                title: 'Read'
            }
        ]
    }
    
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        })
    }

    render() {
        console.log(this.state.books);
        return (
            <div className="app">
            <Route exact path="/" render={() =>
                <MyReads
                    books = {this.state.books}
                    shelves = {this.state.shelves}
                />}
            />
            <Route path="/search" render={() => <SearchBooks/>} />
            </div>
        )
    }
}

export default BooksApp