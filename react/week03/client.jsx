import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root'

// 구조분해 문법 (exports되는 게 객체나 배열이면 구조 분해할 수 있음)
// const { hot } = require('react-hot-loader/root');

// require : node의 모듈 시스템
import Baseball from './Baseball';

const Hot = hot(Baseball);

ReactDom.render(<Baseball />, document.querySelector('#root'));