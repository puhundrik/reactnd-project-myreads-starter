import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import BookPreview from './BookPreview'
import * as BooksAPI from '../BooksAPI'

class SearchBooks extends Component {
    constructor(props) {
        super(props);
        this.timerId = null;
        this.state = {
            query: '',
            searchResults: []
        };
    }

    handleChangeShelf () {
        if (this.props.onSetShelf) {
            this.props.onSetShelf()
        }
    }

    updateQuery = (query) => {
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }

        this.timerId = setTimeout(() => {
        if (query.length > 0){
            console.log(query)
            BooksAPI.search(query)
            .then((books) => {
                if (!books || books.error) {
                    throw new Error(books.error || 'Something happend. Check API!');
                }
                this.setState({query: query, searchResults: books })
            })
            .catch((error) => {
                console.log(error.message)
                this.setState({query: query, searchResults:[]})
            })
        }else{
            console.log('empt')
            this.setState({query: '', searchResults:[]})
        }

        this.setState({query: query.trim()})
        console.log(this.state.searchResults)
        }, 300)
    }

    setShelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
        .then(() => {
            this.handleChangeShelf()
        })
    }

    render() {
        const books = this.state.searchResults
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
        )
    }
}

export default SearchBooks