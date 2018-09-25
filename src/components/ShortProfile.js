import React from 'react';
import Reflux from 'reflux';
import ProfileStore from '../stores/ProfileStore';
import ProfileActions from '../actions/ProfileActions';
import logOut from '../utils/logout';
import $ from 'jquery';

class ShortProfile extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      specialty: '',
      picture: ''
    };
    this.store = ProfileStore;
  }

  componentDidMount() {
    ProfileActions.loadProfile();
  }

  render() {
    return (
      <div className="profile-wrapper">
        <img src={process.env.REACT_APP_URL + this.state.picture.url} className='profile-img' alt='' width='150' height='150'/>
        <div className='profile-info'>
          <p className='name'>{this.state.name}</p>
          <p className='specialty'>{this.state.specialty}</p>
        </div>
        <div className='profile-options'>
          <div><span onClick={this.openProfile.bind(this)}>Профил</span></div>
          <div><span className='logout' onClick={logOut}>Изход</span></div>
        </div>
      </div>
    );
  }

  openProfile() {
    $('#myProfile').modal('toggle');
  }
}

export default ShortProfile;