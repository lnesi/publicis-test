import React from 'react';
import './App.scss';
import Carousel from './Carousel';
import usePixabayApi from '../hooks/usePixabayApi';

function App() {
  const { data, loading } = usePixabayApi('beautiful landscape');
  return (
    <div className="App">
      <header className="App__header">
        <h1>Carousel Test</h1>
      </header>
      {loading && <div>Loading</div>}
      {!loading && data.length > 0 && <Carousel images={data} />}
    </div>
  );
}

export default App;
