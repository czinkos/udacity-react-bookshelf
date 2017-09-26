import React, { Component } from 'react';
import BooksGrid from './BooksGrid';
import { Link } from 'react-router-dom';

class Bookshelf extends Component {
   render() {
    return (
      <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.props.shelfList.map(shelf =>
                  <div className="bookshelf" key={shelf.id}>
                    <h2 className="bookshelf-title">{shelf.title}</h2>
                    <div className="bookshelf-books">
                      <BooksGrid
                        books={this.props.books[shelf.id]}
                        shelfList={this.props.shelfList}
                        onShelfChange={this.props.onShelfChange}
                        />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
    )
  }
}

export default Bookshelf;