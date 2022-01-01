import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root'

import Baseball from './RenderTest';

const Hot = hot(Baseball);

ReactDom.render(<Hot />, document.querySelector('#root'));