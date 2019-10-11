import React from 'react'
import axios from 'axios';
import AceEditor from 'react-ace';
import { Link } from "react-router-dom";
import './Task.css';

import 'brace/mode/javascript'
import 'brace/mode/ruby'
import 'brace/theme/monokai'

const config = {headers: { "Authorization" : localStorage.getItem('authToken') }};

export default class Task extends React.Component {
  state = {
    task: [],
    tests: [],
    languages: [],
    language: 1,
    body: ""
  }

  constructor(props, context) {
    super(props, context);

    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {   
    axios.get('http://localhost:3001/api/v1/tasks/'+this.props.match.params.task, config)
      .then(res => {
        const task = res.data[0];
        this.setState({ task });
        const tests = res.data[1];
        this.setState({ tests });
      })

    axios.get('http://localhost:3001/api/v1/languages', config)
      .then(res => {
        const languages = res.data;
        this.setState({ languages });
      })
  }

  onChange(newValue) {
    this.state.body = newValue
  }

  handleChange(event) {
    const language = event.target.value;
    this.setState({ language });
  }

  send = async() => {
     await axios.post('http://localhost:3001/api/v1/requests',{
                        body: this.state.body,
                        language_id: this.state.language,
                        task_id: this.state.task.id},
                        config)
      .then(res => {
        location.replace('/requests')
      }).catch(err => {
        console.log(err.response.data)
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
                <td><textarea readOnly className="form-control" value={test.body} rows="5"/></td>
                <td><textarea readOnly className="form-control" value={test.answer} rows="5"/></td>
                </tr>
              )}
            </tbody>
        </table>
        <h3>Отправить Решение:</h3>
        <div className="form-group">
          <label>Выберете язык:</label>
          <select className="form-control" id="exampleFormControlSelect1" defaultValue={this.state.language} onChange={this.handleChange}>
            { this.state.languages.map(language => 
                <option value={language.id}>{language.name}</option>
              )}
            </select>
          </div>
        <br/>
        <AceEditor
          placeholder=""
          mode="ruby"
          theme="monokai"
          name="blah2"
          width="100%"
          onLoad={this.onLoad}
          onChange={this.onChange}
          fontSize={16}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={``}
          setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
          }}/>
          <br/>
          <Link to="#" onClick={() => this.send()} className="btn btn-outline-success">Отправить</Link>
      </div>
    )
  }
}