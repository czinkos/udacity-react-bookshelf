import React from 'react';
import Book from './Book';

function BooksGrid(props) {
  return (
    <ol className="books-grid">
      {props.books.length > 0 &&
        props.books.map(book =>
        <li key={book.id}>
          <Book id={book.id}
                title={book.title}
                authors={book.authors || []}
                cover={book.imageLinks && book.imageLinks.thumbnail}
                shelf={book.shelf}
                onShelfChange={props.onShelfChange}
                shelves={props.shelves}/>
        </li>
      )}
      { props.loading &&
        <p>Loading...</p>
      }
    </ol>
  )
}

export default BooksGrid;