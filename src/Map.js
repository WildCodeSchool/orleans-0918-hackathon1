import React, {Component} from 'react';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {gps: [47.89108239702844, 1.9029951095581055]};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const gps = Math.random()*100;
        console.log(gps);
        localStorage.setItem('gps', gps);
    }

    componentDidMount() {
        localStorage.setItem('gps', Math.random()*100);
    }

    render() {
        // let myMap = L.map('mapid').setView([1.8342018127441408, 47.866213493831836], 13);
        //
        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(map);
        //
        // L.marker([47.89108239702844, 1.9029951095581055]).addTo(map)
        //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        //     .openPopup();

        return (
            <div className="map">
                <div id="mapid"></div>
                <div onClick={this.handleClick}>GPS random</div>
            </div>
        );
    }
}

export default Map;
