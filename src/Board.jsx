import io from 'socket.io-client';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import React from 'react';
import ReactDOM from 'react-dom'
import {UnControlled as CodeMirror} from 'react-codemirror2'

import {RECEIVE_TEXT, CHANGE_TEXT, GET_TEXT, CLIENT_CONNECT, CLIENT_DISCONNECT, RECEIVE_LANGUAGE, CHANGE_LANGUAGE, GET_LANGUAGE} from './constants';

import {useParams} from 'react-router-dom';


export default class Board extends React.Component {

  constructor(props) {
    super(props);
    let roomId = props.match.params.roomId || '404';
    this.socket = io(`http://localhost:3000?room=${roomId}`);
    this.state = {
      text: '',
      language: '',
      roomId: roomId
    }

    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  componentDidMount() {
    this.socket.on(RECEIVE_TEXT, (data) => {
      this.setState({text: data.text});
    });
    this.socket.on(RECEIVE_LANGUAGE, (data) => {
      this.setState({language: data.language});
    });
    this.socket.on(CLIENT_CONNECT, () => {
      this.socket.emit(GET_TEXT, {});
      this.socket.emit(GET_LANGUAGE, {});
    });
  }

  componentWillUnmount() {
    this.socket.emit(CLIENT_DISCONNECT, {});
  }

  handleEditorChange(editor, data, value) {
    if (value !== this.state.text) {
      this.socket.emit(CHANGE_TEXT, {text: value});
    }
  }

  handleLanguageChange(event) {
    let language = event.target.value
    this.setState({language: language}, () => {
      this.socket.emit(CHANGE_LANGUAGE, {language: language});
    });
  }

  render() {
    return (
      <div>
        <select value={this.state.language} onChange={this.handleLanguageChange}>
          <option value="">Default</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
        <CodeMirror
        value={this.state.text}
        options={{
          mode: this.state.language,
          theme: 'material',
          lineNumbers: true
        }}
        onChange={this.handleEditorChange}
      />
    </div>);
  }
}
