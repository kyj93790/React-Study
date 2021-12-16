const React = require('react');
const ReactDom = require('react-dom');

// 상대경로로 불러와서 합쳐 줌
const WordRelay = require('./WordRelay');

ReactDom.render(<WordRelay />, document.querySelector('#root'));