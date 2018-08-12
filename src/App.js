import React from 'react';
import { Route } from 'react-router';
import MyReads from './components/MyReads';
import SearchBooks from './components/SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';


class BooksApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
        this.updateShelf = this.updateShelf.bind(this);
    }
    

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books});
        });
    }

    updateShelf (book, shelf) {
        BooksAPI.update(book, shelf)
        .then(() => {
            book.shelf = shelf;
            this.setState((state) => ({
                books: state.books.filter(b => b.id !== book.id).concat(book)
            }));
        });
    }
    
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