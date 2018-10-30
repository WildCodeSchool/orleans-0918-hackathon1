import React, {Component} from 'react';
import './App.css';
import Candies from './Candies';
import Map from './Map';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Map></Map>
                <Candies />
            </div>
        );
    }
}


export default App;
