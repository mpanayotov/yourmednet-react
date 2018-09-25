import Reflux from 'reflux';
import FeedActions from '../actions/FeedActions';
import request from 'superagent';

class FeedStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      medcases: []
    };
    this.listenables = FeedActions;
  }

  onLoadFeed(filter={}) {
    this.retrieveFeed(filter);
  }

  retrieveFeed(filter) {
    request.get(process.env.REACT_APP_API + 'casefeed')
      .set('Authentication-token', window.localStorage.getItem('auth_token'))
      .query({ filter: filter })
      .then(res => {
        if(res && res.status === 200)
          this.setState({ medcases: res.body });
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export default FeedStore;