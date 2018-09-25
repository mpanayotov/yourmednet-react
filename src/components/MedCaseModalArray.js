import React from 'react';
import Reflux from 'reflux';
import FeedStore from '../stores/FeedStore';
import MedCaseModal from './MedCaseModal';

class MedCaseModalArray extends Reflux.Component {
  constructor(props) {
      super(props);
      this.state = { 
        medcases: [] 
      };
      this.store = FeedStore;
  }

  render() {
    return (
      <div>
        {this.renderCases()}
      </div>
    );
  }

  renderCases() {
    return this.state.medcases.map((medcase, i) => { return <MedCaseModal medcase={medcase} key={i} /> });
  }
}

export default MedCaseModalArray;