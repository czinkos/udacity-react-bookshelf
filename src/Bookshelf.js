import React from 'react'
import Book from './Book'

class Bookshelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.length > 0 &&
              this.props.books.map((book,i) =>
              <li key={i}>
                <Book id={book.id}
                      title={book.title}
                      authors={book.authors}
                      cover={book.imageLinks.thumbnail}
                      shelf={this.props.id}
                      onShelfChange={this.props.onShelfChange}
                      shelves={this.props.shelves}/>
              </li>
            )}
            { !this.props.loading && this.props.books.length === 0 &&
              <p>This shelf is empty.</p>
            }
            { this.props.loading &&
              <p>Loading...</p>
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf