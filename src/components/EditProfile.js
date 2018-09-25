import React from 'react';
import Reflux from 'reflux';
import ProfileStore from '../stores/ProfileStore';
import ProfileActions from '../actions/ProfileActions';
import request from 'superagent';
import $ from 'jquery';

class EditProfile extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      specialty: '',
      workplace: '',
      city: '',
      picture: '',
      biography: '',
      anonymous: false,
      picture_file: null,
    };
    this.store = ProfileStore;
  }

  render() {
    return (
      <div>
        <div className="status"></div>
        <div className="col-sm-4">
          <img src={process.env.REACT_APP_URL + this.state.picture.url} className='profile-picture' alt='' width="300px" height="300px"/>
          <div className="btn-picture">
            <label className="btn btn-default btn-file">
                Browse <input type="file" accept="image/*" onChange={this.handleImageChange.bind(this)} />
            </label>
          </div>
          <div className="name">
            <input type="text" className="form-control" placeholder="Име и фамилия" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
          </div>
          <div className="lbl">Специалност: </div>
          <div className="specialty">
            <input type="text" className="form-control" placeholder="Специалност" value={this.state.specialty} onChange={this.handleSpecialtyChange.bind(this)} />           
          </div>
          <div className="lbl">Град: </div>
          <div className="city">
            <input type="text" className="form-control" placeholder="Град" value={this.state.city} onChange={this.handleCityChange.bind(this)} />
          </div>
          <div className="lbl">Работно място: </div>
          <div className="workplace">
            <input type="text" className="form-control" placeholder="Работно място" value={this.state.workplace} onChange={this.handleWorkplaceChange.bind(this)} />
          </div>
          <div className="checkbox">
            <label className="lbl">
              <input type="checkbox" checked={this.state.anonymous} onChange={this.handleAnonymityChange.bind(this)} />
              Анонимен профил в YourMedNet
            </label>
          </div>
        </div>
        <div className="lbl">Биография:</div>
        <div className="col-sm-8 biography">
          <textarea placeholder="Вашата автобиография" value={this.state.biography} onChange={this.handleBiographyChange.bind(this)} className="form-control"></textarea>
        </div>
        <div className="col-sm-12">
          <button onClick={this.updateField.bind(this)} className="btn btn-primary pull-right mt-5" type="button">Запази</button>
        </div>
      </div>
    );
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleSpecialtyChange(e) {
    this.setState({specialty: e.target.value});
  }

  handleWorkplaceChange(e) {
    this.setState({workplace: e.target.value});
  }

  handleCityChange(e) {
    this.setState({city: e.target.value});
  }

  handleAnonymityChange() {
    this.setState({anonymous: !this.state.anonymous});
  }

  handleBiographyChange(e) {
    this.setState({biography: e.target.value});
  }

  handleImageChange(e) {
    if(e.target.files.length === 0)
      return

    var reader = new FileReader();
    reader.onload = function (e) {
        $('#myProfile .profile-picture').attr('src', e.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);

    this.setState({picture_file: e.target.files[0]});
  }

  updateField() {
    if(this.emptyInput()) {
      this.showInvalidInputErr();
      return;
    }

    request.put(process.env.REACT_APP_API + 'sessions')
      .set('Authentication-token', window.localStorage.getItem('auth_token'))
      .send(this.profileData())
      .then(res => {
        if(res && res.status === 200) {
          this.showSuccessMsg();
          ProfileActions.loadProfile();
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  profileData() {
    var formData = new FormData();
    for (var field in this.state){
      if(field === 'picture')
        continue;
      if(field === 'picture_file')
        if(this.state.picture_file)
          formData.append("profile[picture]", this.state[field]);
      if(field === 'name')
        formData.append("profile[user_attributes][name]", this.state[field]);
      else
        formData.append("profile[" + field + "]", this.state[field]);
    }

    return formData;
  }

  emptyInput(){
    return !(this.state.name && 
             this.state.workplace &&
             this.state.biography &&
             this.state.city &&
             this.state.specialty);
  }

  showSuccessMsg() {
    var status = $('#myProfile .status');
    status.html('Профилът е обновен успешно.').addClass('success').show(1000);
    setTimeout(function(){
      status.hide(1000);
      status.removeClass('success');
    }, 3000);
  }

  showInvalidInputErr(){
    var status = $('#myProfile .status');
    status.html('Съществуват празни полета.').addClass('invalid').show(1000);
    setTimeout(function(){
      status.hide(1000);
      status.removeClass('invalid');
    }, 3000);
  }
}

export default EditProfile;