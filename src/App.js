import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import BooksGrid from './BooksGrid'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.shelfChange = this.shelfChange.bind(this)
    this.addBooks = this.addBooks.bind(this)
    this.getBookList = this.getBookList.bind(this)
    this.onQueryChange = this.onQueryChange.bind(this)
  }

  shelves = [
    { id: "currentlyReading", name: "Currently Reading"},
    { id: "wantToRead", name: "Want To Read"},
    { id: "read", name: "Read"}
  ]

  state = {
    books: {},
    shelves: {},
    loading: false,
    searchHits: []
  }

  addBooks(data) {
    const state = data.reduce((acc, d) => {
      if (!acc.shelves[d.shelf]) acc.shelves[d.shelf] = [];
      acc.shelves[d.shelf].push(d.id);
      acc.books[d.id] = d;
      return acc;
    }, {
      books: {},
      shelves: {}
    })
    this.setState(state);
  }

  shelfChange(book, shelf) {
    BooksAPI.update(book, shelf)
      .then(shelves => {
        const books = this.state.books;
        books[book.id] = book;
        book.shelf = shelf;
        this.setState( { shelves, books });
      });
  }

  getBookList = shelf =>
    (this.state.shelves[shelf] || []).map(e => this.state.books[e]);

  onQueryChange(event) {
    const query = event.target.value;
    BooksAPI.search(query)
      .then(searchHits => {
        this.setState({
          searchHits: searchHits.map(e => this.state.books[e.id] ? this.state.books[e.id] : e)
        });
      });
  }

  componentDidMount() {
    this.setState({ loading: true });
    BooksAPI.getAll()
      .then(this.addBooks)
      .then(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() =>
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text"
                  value={this.query}
                  onChange={this.onQueryChange}
                  placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <BooksGrid
                books={this.state.searchHits}
                shelves={this.shelves}
                onShelfChange={this.shelfChange}
                loading={this.state.loading}/>
            </div>
          </div>
        } />
        <Route exact path="/" render={() =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.shelves.map(shelf =>
                <Bookshelf
                  key={shelf.id}
                  loading={this.state.loading}
                  id={shelf.id}
                  title={shelf.name}
                  books={this.getBookList(shelf.id)}
                  onShelfChange={this.shelfChange}
                  shelves={this.shelves}/>
                )}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        } />
      </div>
    )
  }
}

export default BooksApp
