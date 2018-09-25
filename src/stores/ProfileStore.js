import Reflux from 'reflux';
import ProfileActions from '../actions/ProfileActions';
import request from 'superagent';

class ProfileStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {};
    this.listenables = ProfileActions;
  }

  onLoadProfile() {
    request.get(process.env.REACT_APP_API + 'sessions')
      .set('Authentication-token', window.localStorage.getItem('auth_token'))
      .then(res => {
        if(res && res.status === 200){
          var data = res.body;
          this.setState({
            user_id: data.user_id,
            name: data.name,
            picture: data.picture,
            workplace: data.workplace,
            city: data.city,
            specialty: data.specialty,
            biography: data.biography,
            med_cases: data.med_cases,
            answers: data.answers,
            anonymous: data.anonymous
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export default ProfileStore;