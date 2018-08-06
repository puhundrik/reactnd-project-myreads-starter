import React, {Component} from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class MyReads extends Component {
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
        const books = this.state.books
        const shelves = this.state.shelves
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map((shelf) => (
                            <BookShelf
                                key={shelf.name}
                                title={shelf.title}
                                books = {books.filter((book) => book.shelf === shelf.name)}
                            />
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default MyReads