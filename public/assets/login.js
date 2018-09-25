class Login extends React.Component {
  constructor(props) {
      super(props);
      this.state = { email: '', password: '' };
  }

  render() {
    return (
      <div className="signIn">
        <div className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">YourMedNet | Вход</h1>
          {this.warning()}
          <input type="email" className="form-control" placeholder="Email address" value={this.state.email} onChange={this.handleEmailChange.bind(this)} />
          <input type="password" className="form-control" placeholder="Password" value={this.state.password} onKeyUp={this.onEnter.bind(this)} onChange={this.handlePasswordChange.bind(this)} />
          <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleLogIn.bind(this)}>Вход</button>
        </div>
      </div>
    );
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  onEnter(e) {
    if (e.keyCode === 13)
      this.handleLogIn();
  }

  handleLogIn() {
    if(this.state.email.trim().length === 0 || this.state.password.trim().length === 0)
      return

    $.post('http://localhost:3000/v1/sessions',
      { email: this.state.email, password: this.state.password },
      function(result, _, request) {
        if(result && request.status === 201)
        {
          window.localStorage.setItem('auth_token', result['authentication_token']);
          window.location.href = '/';
        }
      })
      .fail(function(error) {
        if(error.status === 401)
          this.setState({ error: 'Invalid email or password!'});
      }.bind(this))
  }

  warning() {
    if(this.state.error)
      return <p className='text-danger'>{this.state.error}</p>;
  }
}

ReactDOM.render(<Login />,document.querySelector('#login'));