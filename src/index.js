import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Hello from './Hello';
import * as serviceWorker from './serviceWorker';
import ReactDOMServer from 'react-dom/server';

ReactDOM.render(<App />, document.getElementById('root'));
//console.log(ReactDOMServer.renderToStaticMarkup(<Hello name="coucou"/>));
ReactDOM.hydrate(
  <Hello name="LOADING"/>,
  document.getElementById('hydrateRoot')
)

ReactDOM.render(<Hello name="LOADING"/>, document.getElementById('renderRoot'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
