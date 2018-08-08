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
        this.setState({query: query})
        
        /*if (query.length > 0){
            console.log(query)
            BooksAPI.search(query)
            .then((books) => {
                if (!books || books.error) {
                    return Promise.reject(new Error(books.error || 'Something happend. Check API!'));
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
        console.log(this.state.searchResults)*/
    }
    
    getBooksBySearch() {
        if (this.state.query.length > 0) {
            BooksAPI.search(this.state.query)
            .then((books) => {
                if (!books || books.error) {
                    return Promise.reject(new Error(books.error || 'Something happend. Check API!'));
                }
                
            })
            .catch((error) => {
                console.log(error.message)
                return []
            })
        } else {
            return []
        }
    }
    
    setShelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
        .then(() => {
            this.handleChangeShelf()
        })
    }
    
    componentDidMount() {
        console.log('mount');
    }
    
    render() {
        console.log(this.getBooksBySearch())
        const books = this.getBooksBySearch()
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