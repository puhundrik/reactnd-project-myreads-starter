import React, {Component} from 'react'
import BookShelf from './BookShelf'

class MyReads extends Component {
    render() {
        const books = this.props.books
        const shelves = this.props.shelves
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
                    <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                </div>
            </div>
        )
    }
}

export default MyReads