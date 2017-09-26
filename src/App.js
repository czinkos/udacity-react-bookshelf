import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import SearchPanel from './SearchPanel'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.shelfChange = this.shelfChange.bind(this)
    this.addBooks = this.addBooks.bind(this)
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
        { this.state.loading &&
          <div id="loading">Loading...</div>
        }
        <Route path="/search" render={() =>
          <SearchPanel
            shelfList={this.shelfList}
            booksOnShelf={this.state.books}
            onShelfChange={this.shelfChange} />
        }/>
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

export default BooksApp;
