import React from 'react';
import request from 'superagent';
import $ from 'jquery';

class MedCase extends React.Component {
  render() {
    return (
      <div className="panel panel-default medcase">
        <div className="panel-heading">
          <div className="row">
            <div className={"col-sm-3 " + this.pointerClass()} onClick={this.openUserProfile.bind(this)}>
              <div className="holder-left">
                <img className="img-circle" alt="" src={process.env.REACT_APP_URL + this.props.medcase.author.picture.url} />
              </div>
              <div className="holder-right">
                <span className="author">{this.props.medcase.author.name}</span>
              </div>
            </div>
            <div className="col-sm-9">
              <span onClick={this.showCase.bind(this)} className="title">{this.props.medcase.title}</span>
            </div>
        </div>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-sm-3">
              {this.renderAttachedDocument()}
            </div>
            <div className="description col-sm-9">{this.props.medcase.description}</div>
          </div>
        </div>
      </div>
    );
  }

  pointerClass() {
    return this.props.medcase.author.anonymous ? '' : 'profile-holder';
  }

  renderAttachedDocument() {
    if(this.props.medcase.documents.length > 0)
      return (<img className="pull-left" width="150px" alt="" src={process.env.REACT_APP_URL + this.props.medcase.documents[0].document.url} />);
    return (<img className="pull-left" width="150px" alt="" src={process.env.REACT_APP_URL + "/default_document.png"} />);
  }

  openUserProfile () {
    if(this.props.medcase.author.anonymous)
      return;

    request.get(process.env.REACT_APP_API + 'profiles/' + this.props.medcase.author.id)
      .set('Authentication-token', window.localStorage.getItem('auth_token'))
      .then(res => {
        if(res && res.status === 200)
          this.updateProfileInfoAndOpenModal(res.body)
      })
      .catch(error => {
        console.log(error);
      })
  }

  updateProfileInfoAndOpenModal(profile) {
    $('#userProfile .profile-picture').attr('src', process.env.REACT_APP_URL + profile.picture.url);
    $('#userProfile .name').html(profile.name);
    $('#userProfile .specialty').html(profile.specialty);
    $('#userProfile .workplace').html(profile.workplace);
    $('#userProfile .city').html(profile.city);
    $('#userProfile .cases span').html(profile.med_cases);
    $('#userProfile .answers span').html(profile.answers);
    $('#userProfile .biography').html(this.profileBiography(profile));
    $('#userProfile').modal('toggle');
  }

  profileBiography(profile) {
    if(!profile.biography)
      return '';

    return profile.biography.split('\n').map((line) => {
      return line + '<br />';
    }).join('');
  }

  showCase() {
    $('#showCase-' + this.props.medcase.id).modal('toggle');
  }
}

export default MedCase;