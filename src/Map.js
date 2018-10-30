import React, {Component} from 'react';
import L from 'leaflet';


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {gps: [47.89108239702844, 1.9029951095581055]};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const gps = Math.random()*100;
        localStorage.setItem('gps', gps);
    }

    componentDidMount() {
        localStorage.setItem('gps', Math.random()*100);

        let myMap = L.map('mapid').setView([47.89385, 1.89507], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap);

        L.marker([47.89385, 1.89507]).addTo(myMap)
            .bindPopup('Wild Code School')
            .openPopup();
    }

    render() {
        return (
            <div className="map">
                <div id="mapid" class="map"></div>
                <div onClick={this.handleClick}>GPS random</div>
            </div>
        );
    }
}

export default Map;
