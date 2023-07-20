import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import store from './redux'; // Import your Redux store
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap your App component with the Provider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


