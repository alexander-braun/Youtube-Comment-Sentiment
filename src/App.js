import React from 'react'
import Settings from './components/Settings'
import Display from './components/Display'

function App() {
  return (
    <div className="App">
      <h1>Consensus</h1>
      <p className="subheading">AFINN Youtube Sentiment Analysis</p>
      <Settings />
      <Display />
    </div>
  );
}

export default App;
