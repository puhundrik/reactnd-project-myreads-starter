import React, {Component} from 'react'
import BookPreview from './BookPreview'

class BookShelf extends Component {
    render() {
        return (
            <div className="bookshelf">
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.props.books.map((book) => (
                        <li key={book.id}>
                            <BookPreview
                                book={book}
                            />
                        </li>
                    ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf