import React from 'react'
import Search from './components/Search'
import Display from './components/Display'

function App() {
  return (
    <div className="app">
      <h1 className="app__page-title">Consensus</h1>
      <p className="app__subheading">AFINN Youtube Sentiment Analysis</p>
      <Search />
      <Display />
    </div>
  );
}

export default App;
