import React from 'react'
import { Route, Link } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.shelfChange = this.shelfChange.bind(this)
  }

  shelves = [
    { id: "currentlyReading", name: "Currently Reading"},
    { id: "wantToRead", name: "Want To Read"},
    { id: "read", name: "Read"}
  ]

  state = {

    currentlyReading: [
                    {
                      cover: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
                      title: 'To Kill a Mockingbird',
                      authors: ['Harper Lee'],
                      shelf: "currentlyReading"
                    }
    ],
    wantToRead: [],
    read: []
  }

  shelfChange(bookId, oldShelf, newShelf) {
    console.log(bookId, oldShelf, newShelf)
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
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
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
                {this.shelves.map(e =>
                <Bookshelf
                  key={e.id}
                  title={e.name}
                  books={this.state[e.id]}
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
