import React from 'react';
import $ from 'jquery';
import request from 'superagent';
import FeedActions from '../actions/FeedActions';

class MedCaseModal extends React.Component {
  render() {
    return (
      <div id={'showCase-' + this.props.medcase.id} className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog">
					<div className="modal-content">
						<div className='row'><button type="button" className="close block-d" data-dismiss="modal" aria-hidden="true">X</button></div>
						<div className="modal-body row">
								<div className="col-sm-12">
									<img src={process.env.REACT_APP_URL + this.props.medcase.author.picture.url} className="img-circle profile-picture" alt="" />
									<span className="name">{this.props.medcase.author.name}</span>
								</div>
								<div className="col-sm-12 border case">
									<div className="col-sm-11 pull-right case-wrapper">
										<div className="col-sm-3">
                     {this.renderAttachedDocument()}
                    </div>
                    <div className="title col-sm-9">
                      {this.props.medcase.title}
										</div>
										<div className="description col-sm-9">
                      {this.props.medcase.description}
                    </div>
									</div>
                      {this.renderCaseComments()}
									<div className="clear"></div>
								</div>
                {this.renderAnswers()}
                {this.answerInput()}
						</div>
					</div>
				</div>
      </div>
    );
  }

  renderAttachedDocument() {
    if(this.props.medcase.documents.length > 0)
      return (<img className="attached-document" src={process.env.REACT_APP_URL + this.props.medcase.documents[0].document.url} alt="" />);
  }

  renderCaseComments() {
    return (<div className="col-sm-11 pull-right comments">
              {this.props.medcase.comments.map((comment, i) => { return this.renderComment(comment, i) })}
              <div className="clear"></div>
              {this.renderCommentButton()}
            </div>);
  }

  renderComment(comment, i)
  {
    return (
      <div key={i} className="col-sm-12 pull-right comment">
        <img src={process.env.REACT_APP_URL + comment.author.picture.url} className="author-img img-circle" alt="" />
        <span className="author">{comment.author.name}</span>
        <span className="content">{comment.content}</span>
      </div>
    );
  }

  renderCommentButton()
  {
    return (<div className="input-group comment-input-wrapper">
              <input type="text" className="form-control comment-input" placeholder="Коментар" />
              <span className="input-group-btn">
                <button onClick={this.createComment.bind(this)} className="btn btn-default comment-btn" type="button">Коментирай</button>
              </span>
            </div>);
  }

  renderAnswers() {
    if(this.props.medcase.answers.length > 0) {
      return (
        <div className="col-sm-12 answers">
          { this.props.medcase.answers.map((answer, k) => { return this.renderAnswer(answer, k) })}
        </div>
      );
    }
  }

  renderAnswer(answer, k) {
    return (
      <div answerid={answer.id} key={k} className="col-sm-12 border answer">
        <div className="col-sm-1 answer-lbl">Отговор:</div>
        <div className="col-sm-11 pull-right">
          <img src={process.env.REACT_APP_URL + answer.author.picture.url} className="author-img img-circle" alt="" />
          <span className="author-answer">{answer.author.name}</span>
        </div>
        <div className="col-sm-11 pull-right content">{answer.content}</div>
        <div className="col-sm-11 pull-right comments">
          {answer.comments.map((comment, i) => { return this.renderComment(comment, i) })}
          <div className="clear"></div>
          {this.renderCommentButton()}
        </div>
        <div className="clear"></div>
      </div>
    );
  }

  createComment(el) {
    var commentBtn = $(el.target);
    var comment = commentBtn.parents('.comment-input-wrapper').children('input')[0].value.trim();
    if(comment.length === 0) return

    if(commentBtn.parents('.case').length > 0)
    {
      this.publishComment(comment, this.props.medcase.id, 'MedCase');
    }
    else
    {
      var answerId = commentBtn.closest('.answer').attr('answerid');
      this.publishComment(comment, answerId, 'Answer');
    }
  }

  answerInput() {
    return (<div className="input-group answer-input-wrapper">
              <textarea className="form-control custom-control text-answer" rows="3" placeholder="Вашият отговор"></textarea>     
              <span onClick={this.createAnswer.bind(this)} className="input-group-addon btn btn-primary">Отговори</span>
            </div>);
  }

  createAnswer(el) {
    var answer = $(el.target).parents('.answer-input-wrapper').children('textarea')[0].value.trim();
    if(answer.length === 0) return

    this.publishAnswer(answer, this.props.medcase.id)
  }

  publishComment(comment, commentable_id, commentable_type)
  {
    request.post(process.env.REACT_APP_API + 'comments')
      .set('Authentication-token', window.localStorage.getItem('auth_token'))
      .send(
        {
          content: comment,
          commentable_id: commentable_id,
          commentable_type: commentable_type
        }
      )
      .then(res => {
        if(res && res.status === 201)
          FeedActions.loadFeed();
        this.resetInputValues();
      })
      .catch(error => {
        console.log(error);
      })
  }

  publishAnswer(answer, medcaseId)
  {
    request.post(process.env.REACT_APP_API + 'answers')
      .set('Authentication-token', window.localStorage.getItem('auth_token'))
      .send(
        {
          content: answer,
          medcase_id: medcaseId
        }
      )
      .then(res => {
        if(res && res.status === 201)
          FeedActions.loadFeed();
        this.resetInputValues();
      })
      .catch(error => {
        console.log(error);
      })
  }

  resetInputValues() {
    $('.comment-input').val('');
    $('.text-answer').val('');
  }
}

export default MedCaseModal;