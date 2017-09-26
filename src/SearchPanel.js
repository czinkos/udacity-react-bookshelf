import React, { Component } from 'react';
import BooksGrid from './BooksGrid';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.state = { searchHits: [], query: '' };
  }

  onQueryChange(event) {
    const query = event.target.value;
    BooksAPI.search(query)
      .then(searchHits => {
        if (searchHits.error) return;
        this.setState({
          searchHits: searchHits.map(
            e => this.props.booksOnShelf[e.id] ? this.props.booksOnShelf[e.id] : e
          )
        });
      });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              value={this.query}
              onChange={this.onQueryChange}
              placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={this.state.searchHits}
            shelfList={this.props.shelfList}
            onShelfChange={this.props.onShelfChange}
        />
        </div>
      </div>
    )
  }
}

export default SearchPanel;