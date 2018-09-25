import React from 'react';
import Reflux from 'reflux';
import FeedStore from '../stores/FeedStore';
import FeedActions from '../actions/FeedActions';
import MedCase from './MedCase';

class MedFeed extends Reflux.Component {
  constructor(props) {
      super(props);
      this.state = { 
        medcases: [] 
      };
      this.store = FeedStore;
  }

  componentDidMount() {    
    FeedActions.loadFeed();
  }

  render() {
    return (
      <div>
        {this.renderCases()}
      </div>
    );
  }

  renderCases() {
    return this.state.medcases.map((medcase, i) => { return <MedCase medcase={medcase} key={i} /> });
  }
}

export default MedFeed;