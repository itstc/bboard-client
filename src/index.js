import io from 'socket.io-client';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import React from 'react';
import ReactDOM from 'react-dom'
import {UnControlled as CodeMirror} from 'react-codemirror2'


class App extends React.Component {

  constructor(props) {
    super(props);

    this.socket = io('http://localhost:3000');

    this.state = {
      text: ''
    }

    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  componentDidMount() {
    this.socket.on('text', (data) => {
      this.setState({text: data.text});
    });
  }

  handleEditorChange(event) {
    console.log('value: ' + event.target.value);
    this.socket.emit('changeText', {text: event.target.value});
  }

  render() {
    return (<CodeMirror
      value={this.state.text}
      options={{
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true
      }}
      onChange={(editor, data, value) => {
        console.log('value: ' + value);
        if (value !== this.state.text) {
          this.socket.emit('changeText', {text: value});
        }
      }}
    />);
  }
}

ReactDOM.render(<App/>, document.getElementById("app"));

