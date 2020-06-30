import io from 'socket.io-client';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import React from 'react';
import ReactDOM from 'react-dom'
import {UnControlled as CodeMirror} from 'react-codemirror2'

import {RECEIVE_TEXT, CHANGE_TEXT, GET_TEXT, CLIENT_CONNECT, CLIENT_DISCONNECT} from './constants';

import {useParams} from 'react-router-dom';


export default class Board extends React.Component {

  constructor(props) {
    super(props);
    let roomId = props.match.params.roomId || '404';
    this.socket = io(`http://localhost:3000?room=${roomId}`);
    this.state = {
      text: '',
      roomId: roomId
    }

    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  componentDidMount() {
    this.socket.on(RECEIVE_TEXT, (data) => {
      this.setState({text: data.text});
    });
    this.socket.on(CLIENT_CONNECT, () => {
      this.socket.emit(GET_TEXT, {});
    });
  }

  componentWillUnmount() {
    this.socket.emit(CLIENT_DISCONNECT, {});
  }

  handleEditorChange(editor, data, value) {
    if (value !== this.state.text) {
    this.socket.emit(CHANGE_TEXT, {text: event.target.value});
    }
  }

  render() {
    return (<CodeMirror
      value={this.state.text}
      options={{
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true
      }}
      onChange={this.handleEditorChange}
    />);
  }
}
