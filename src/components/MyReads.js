import React, {Component} from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class MyReads extends Component {
    render() {
        const books = this.props.books
        const shelves = [
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
                                onUpdateShelf = {this.props.onSetShelf}
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