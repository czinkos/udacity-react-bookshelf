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
    this.onQueryChange = this.onQueryChange.bind(this)
    this.booksByShelf = this.booksByShelf.bind(this)
  }

  shelfList = [
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

  onQueryChange(event) {
    const query = event.target.value;
    BooksAPI.search(query)
      .then(searchHits => {
        this.setState({
          searchHits: searchHits.map(e => this.state.books[e.id] ? this.state.books[e.id] : e)
        });
      });
  }

  booksByShelf = () =>
    this.shelfList.reduce((acc, shelf) => {
      acc[shelf.id] = (this.state.shelves[shelf.id] || []).map(b => this.state.books[b]);
      return acc;
    }, {})

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
                <input type="text"
                  value={this.props.match}
                  onChange={this.onQueryChange}
                  placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <BooksGrid
                books={this.state.searchHits}
                shelfList={this.shelfList}
                onShelfChange={this.shelfChange}/>
            </div>
          </div>
        } />
        <Route exact path="/" render={() =>
          <Bookshelf
            shelfList={this.shelfList}
            shelves={this.state.shelves}
            books={this.booksByShelf()}
            onShelfChange={this.shelfChange}
          />
        }/>
      </div>
    )
  }
}

export default BooksApp
