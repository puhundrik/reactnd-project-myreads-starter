import React, {Component} from 'react';
import BookPreview from './BookPreview';

/** BookShelf component */
class BookShelf extends Component {
    /**
     * Renders the component
     */
    render() {
        let bookShelf;
        // Show message if no books displayed
        if (this.props.books.length > 0) {
            bookShelf = <div className="bookshelf-books">
                <ol className="books-grid">
                {this.props.books.map((book) => (
                    <li key={book.id}>
                        <BookPreview
                            book={book}
                            onUpdateShelf = {this.props.onUpdateShelf}
                        />
                    </li>
                ))}
                </ol>
            </div>;
        } else {
            bookShelf = 'There are no books on the shelf';
        }

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                {bookShelf}
            </div>
        )
    }
}

export default BookShelf;