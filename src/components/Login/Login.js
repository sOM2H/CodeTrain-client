import React from 'react'
import axios from 'axios';
import { Button, Input} from 'antd';
import Logo from '../../img/logo.png'

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      token: ""
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = async() => {
     await axios.post('http://localhost:3001/api/v1/auth/login', {nickname: this.state.login, password: this.state.password})
      .then(res => {
        const token = res.data['token'];
        this.setState({ token });
      })
    localStorage.setItem('authToken', this.state.token);
    location.reload();
  }
  
  render() {
    return (
      <div className="form-signin text-center">
        <img className="mb-4 " src={ Logo } alt=""/>
        <h1 className="h3 mb-3 font-weight-normal">Вход в систему</h1>
        <Input
          className="form-control filed"
          name='login'
          placeholder='Login'
          required='True'
          onChange={e => this.onChange(e)}
          value={this.state.login} />
        <Input
          className="form-control field"
          name='password'
          placeholder='Password'
          type='password'
          onChange={e => this.onChange(e)}
          value={this.state.password} />
        <Button onClick={() => this.onSubmit()}
          type="primary"
          className="btn btn-lg btn-primary btn-block actions">
            Войти
        </Button>
        <p className="mt-5 mb-3 text-muted">Nix | Ruby © 2019</p>
      </div>
    )
  }
}