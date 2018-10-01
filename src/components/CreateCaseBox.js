import React from 'react';
import request from 'superagent';
import FeedActions from '../actions/FeedActions';
import $ from 'jquery';

class CreateCaseBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', description: '', files: [] };
  }

  render() {
    return (
      <div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<button type="button" className="close" data-dismiss="modal" aria-hidden="true">X</button>
						Твоят клиничен случай
					</div>
					<div className="modal-body">
						<div className="form-group">
							<textarea value={this.state.title} onChange={this.handleTitleChange.bind(this)} className="form-control input-lg title" autoFocus="" placeholder="Заглавие на случая?"></textarea>
						</div>
						<div className="form-group">
							<textarea value={this.state.description} onChange={this.handleDescriptionChange.bind(this)} className="form-control input-lg description" autoFocus="" placeholder="Какво представлява случаят?"></textarea>
						</div>
					</div>
					<div className="modal-footer">
						<div>
							<input onChange={this.handleFileUpload.bind(this)} type="file" />
							<button onClick={this.createCase.bind(this)} className="btn btn-primary btn-sm" data-dismiss="modal" aria-hidden="true">Публикувай</button>
						</div>	
					</div>
				</div>
		  </div>
    );
  }

  createCase() {
    if (!this.state.title.trim())
      return

    var formData = new FormData();
    if(this.state.files.length > 0)
      formData.append("medcase[document_data][]", this.state.files[0])
    formData.append("medcase[title]", this.state.title);
    formData.append("medcase[description]", this.state.description);

    request.post(process.env.REACT_APP_API + 'medcases')
      .set('Authentication-token', window.localStorage.getItem('auth_token'))
      .send(formData)
      .then(res => {
        FeedActions.loadFeed();
        this.resetInputValues();
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  handleFileUpload(e) {
    this.setState({files: e.target.files});
  }

  resetInputValues() {
    $('#createCase textarea').val('');
  }
}

export default CreateCaseBox;