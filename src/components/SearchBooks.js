import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import BookPreview from './BookPreview'
import * as BooksAPI from '../BooksAPI'

class SearchBooks extends Component {
    state = {
        query: '',
        searchResults: []
    }
    
    handleChangeShelf () {
        if (this.props.onSetShelf) {
            this.props.onSetShelf()
        }
    }

    
    updateQuery = (query) => {
        if (query.length > 0){
            BooksAPI.search(query)
            .then((books) => {
                if (!books || books.error) {
                    return Promise.reject(new Error(books.error || 'Something happend. Check API!'));
                }
                this.setState({searchResults: books })
            })
            .catch((error) => {
                console.log(error.message)
                this.setState({searchResults:[]})
            })
        }else{
            this.setState({searchResults:[]})
        }

        this.setState({query: query.trim()})
        
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
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books && books.map((book) => (
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