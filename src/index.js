import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { StateProvider } from './components/context/Context';
import reducer, { initialState } from "./components/store/reducer";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <StateProvider.Provider value={{ reducer, initialState }}>
      <App />
    </StateProvider.Provider> */}
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
);
