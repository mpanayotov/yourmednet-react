import React from 'react';
import FeedActions from '../actions/FeedActions';;

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
  }

  render() {
    return (
      <div className="input-group input-group-sm search-cases">
        <input className="form-control" placeholder="Пример за търсене: 'фрактура', 'алергия'..." type="text" value={this.state.search} onKeyUp={this.onEnter.bind(this)} onChange={this.handleSearchChange.bind(this)} />
        <div className="input-group-btn">
          <button className="btn btn-default" onClick={this.triggerSearch.bind(this)}><i className="glyphicon glyphicon-search"></i></button>
        </div>
      </div>
    );
  }

  handleSearchChange(e) {
    this.setState({search: e.target.value});
  }

  onEnter(e) {
    if (e.keyCode === 13)
      this.triggerSearch();
  }

  triggerSearch(){
    FeedActions.loadFeed({search: this.state.search.trim()});
  }
}

export default SearchBox;