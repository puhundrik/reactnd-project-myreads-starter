import React from 'react'
import { Route } from 'react-router'
import MyReads from './MyReads'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
    state = {
        /**
        * TODO: Instead of using this state variable to keep track of which page
        * we're on, use the URL in the browser's address bar. This will ensure that
        * users can use the browser's back and forward buttons to navigate between
        * pages, as well as provide a good URL they can bookmark and share.
        */
        showSearchPage: false,
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
