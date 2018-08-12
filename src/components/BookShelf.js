import React, {Component} from 'react'
import BookPreview from './BookPreview'

class BookShelf extends Component {
    render() {
        let booShelf;
        if (this.props.books.length > 0) {
            booShelf = <div className="bookshelf-books">
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
            booShelf = 'There are no books on the shelf';
        }
        
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                {booShelf}
            </div>
        )
    }
}

export default BookShelf