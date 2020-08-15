import React from 'react';
import ListView from './components/ListView';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {

  render() { 

    return (
      <div className="App">
        <ListView/>
      </div>
    );
  }
}

export default App;
