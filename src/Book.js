import React from 'react'

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.onShelfChange = this.onShelfChange.bind(this);
  }

  onShelfChange(event) {
    this.props.onShelfChange(
      this.props.id, this.props.shelf, event.target.value);
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
               style={{ width: 128, height: 193,
                        backgroundImage: 'url("' + this.props.cover + '")' }}></div>
          <div className="book-shelf-changer">
            <select value={this.props.shelf}
                    onChange={this.onShelfChange}>
              <option value="none" disabled>Move to...</option>
              {this.props.shelves.map(shelf =>
                <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
              )}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors.join(' - ')}</div>
      </div>
    )
  }
}

export default Book