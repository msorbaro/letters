import React from 'react';
import ReactDOM from 'react-dom';
import Letters from './components/letters';
import Questions from './components/questions';

import './style.scss';

const App = () => (
  <div>
    {' '}
    <Letters />
    {' '}
    <Questions />
    {' '}
  </div>
);

ReactDOM.render(<App />, document.getElementById('main'));
