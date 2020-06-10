import React from 'react'
import Settings from './components/Settings'
import Display from './components/Display'
import './styles/app.css'

function App() {
  return (
    <div className="app">
      <h1 className="app__page-title">Consensus</h1>
      <p className="app__subheading">AFINN Youtube Sentiment Analysis</p>
      <Settings />
      <Display />
    </div>
  );
}

export default App;
