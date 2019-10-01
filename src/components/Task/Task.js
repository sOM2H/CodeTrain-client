import React from 'react'
import axios from 'axios';

export default class Task extends React.Component {
  state = {
    task: [],
    tests: []
  }


  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/tasks/'+this.props.match.params.task, {headers: { "Authorization" : localStorage.getItem('authToken') } })
      .then(res => {
        const task = res.data[0];
        this.setState({ task });
        const tests = res.data[1];
        this.setState({ tests });
      })
  }

  render() {
    return (
      <div className="content">
        <div className="card">
          <div className="card-header">
            <h3>{ this.state.task.title }</h3>
          </div>
          <div className="card-body">
            <h5 className="card-title">Условие:</h5>
            <p className="card-text">
              { this.state.task.body }
            </p>
            <h5 className="card-title">Входные данные:</h5>
              <p className="card-text">
                { this.state.task.input }
              </p>
            <h5 className="card-title">Выходные данные:</h5>
              <p className="card-text">
                { this.state.task.output }
              </p>
          </div>
        </div>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">input.txt</th>
                <th scope="col">output.txt</th>
                </tr>
            </thead>
            <tbody>
             { this.state.tests.map(test => 
                <tr>
                <td>{test.body}</td>
                <td>{test.answer}</td>
                </tr>
              )}
            </tbody>
        </table>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    )
  }
}