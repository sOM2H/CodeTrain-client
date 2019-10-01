import React from 'react'
import { withRouter } from 'react-router';
import HeaderLogo from '../../img/header.png'


class Header extends React.Component {
  logout = () => {
    localStorage.removeItem('authToken');
    const { history } = this.props;
    console.log(history);
    location.reload();
  }

  render() {
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src={ HeaderLogo } alt=""/>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Главная
              </a>
            </li>
            <li className="nav_item active">
              <a className="nav-link" href="/tasks">
                Задачи
              </a>
            </li>
            <li className="nav_item active">
              <a className="nav-link" href="#" onClick={() => this.logout()}>
                Выход
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }
}

export default withRouter(Header);