import React from 'react';
import Carousel from './Carousel';
import usePixabayApi from '../hooks/usePixabayApi';

function App() {
  const { data, loading } = usePixabayApi('beautiful landscape');
  return (
    <div className="App">
      <header className="App-header">Carousel Test</header>
      {loading && <div>Loading</div>}
      {!loading && <Carousel images={data} />}
    </div>
  );
}

export default App;
