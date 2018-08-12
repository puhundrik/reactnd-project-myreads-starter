import React from 'react';
import { Route } from 'react-router';
import MyReads from './components/MyReads';
import SearchBooks from './components/SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

/** Main app component */
class BooksApp extends React.Component {
    /**
     * Component constructor
     * @param {Object} props
     */
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
        this.updateShelf = this.updateShelf.bind(this);
    }

    /**
     * Set state after component is mounted.
     * Fetches shelved books
     */
    componentDidMount() {
        // Get all shelved books
        BooksAPI.getAll().then((books) => {
            this.setState({books});
        });
    }

    /**
     * Update book shelf
     * @param {Object} book - Book object
     * @param {string} shelf - shelf id
     */
    updateShelf (book, shelf) {
        BooksAPI.update(book, shelf)
        .then(() => {
            book.shelf = shelf;
            this.setState((state) => ({
                books: state.books.filter(b => b.id !== book.id).concat(book)
            }));
        });
    }

    /**
     * Renders the component
     */
    render() {
        const books = this.state.books;
        return (
            <div className="app">
            <Route exact path="/" render={() =>
                <MyReads
                    books = {books}
                    onSetShelf = {this.updateShelf}
                />}
            />
            <Route path="/search" render={({history}) => 
                <SearchBooks
                    books = {books}
                    onSetShelf = {this.updateShelf}
                    pushHistory={() => {
                        history.push('/')
                    }}
                />}
            />
            </div>
        );
    }
}

export default BooksApp;