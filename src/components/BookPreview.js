import React, {Component} from 'react';

/** BookPreview component */
class BookPreview extends Component {
    /**
     * Renders the component
     */
    render() {
        const book = this.props.book;
        const bookShelf = book.shelf || 'none';
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
                    }}></div>
                        <div className="book-shelf-changer">
                            <select value={bookShelf} onChange={event => {this.props.onUpdateShelf(book, event.target.value)}}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
            </div>
        );
    }
}

export default BookPreview;