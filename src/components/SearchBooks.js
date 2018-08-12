import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import BookPreview from './BookPreview';
import * as BooksAPI from '../BooksAPI';

/** Component for search page */
class SearchBooks extends Component {
    /**
     * Component constructor
     * @param {Object} props
     */
    constructor(props) {
        super(props);
        this.timerId = null;
        this.state = {
            query: '',
            searchResults: []
        };
    }

    /**
     * Updates search results
     * @param {string} query - The search string
     */
    updateQuery = (query) => {
        if (this.timerId) {
            clearTimeout(this.timerId); // Clear timer to create new
            this.timerId = null;
        }

        this.timerId = setTimeout(() => { // Debounce input
            if (query.length > 0){
                BooksAPI.search(query)
                .then((response) => {
                    // Handle error if occures
                    if (!response || response.error) {
                        throw new Error(response.error || 'Something happend. Check API!');
                    }
                    this.setState({
                        query: query,
                        searchResults: response.map((book) => {
                            const shelvedBook = this.props.books.find((item) => item.id === book.id)
                            if (shelvedBook) {
                                return shelvedBook
                            } else {
                                return book
                            }
                        })
                    });
                })
                // Handle fetch error
                .catch((error) => {
                    console.log(error.message);
                    this.setState({query: query, searchResults:[]});
                })
            }else{
                // No query, no books
                this.setState({query: '', searchResults:[]});
            }
        }, 300)
    }

    /**
     * Shelf change handler
     * @param {Object} book - Book object
     * @param {string} shelf - shelf id
     */
    setShelf = (book, shelf) => {
        this.props.onSetShelf(book, shelf);
        this.props.pushHistory();
    }

    /**
     * Renders the component
     */
    render() {
        const books = this.state.searchResults;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to="/"
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                          NOTES: The search from BooksAPI is limited to a particular set of search terms.
                          You can find these search terms here:
                          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                          you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map((book) => (
                        <li key={book.id}>
                            <BookPreview
                                book={book}
                                onUpdateShelf = {this.setShelf}
                            />
                        </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBooks;