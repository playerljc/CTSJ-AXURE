import React from 'react';
import ReactDOM from 'react-dom';
// import _ from 'lodash';
// import $ from 'jquery';

import App from './pages/app/app';

import './index.less';

// console.log(_);
// console.log($);

const { render } = ReactDOM;
render(<App />, document.getElementById('app'));
