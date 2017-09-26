import React from 'react';
import Book from './Book';

function BooksGrid(props) {
  return (
    <ol className="books-grid">
      {props.books.map(book =>
        <li key={book.id}>
          <Book id={book.id}
                title={book.title}
                authors={book.authors || []}
                cover={book.imageLinks && book.imageLinks.thumbnail}
                shelf={book.shelf}
                onShelfChange={ (event) => props.onShelfChange(book, event.target.value) }
                shelfList={props.shelfList}/>
        </li>
      )}
    </ol>
  )
}

export default BooksGrid;