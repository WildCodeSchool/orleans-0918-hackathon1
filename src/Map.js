import React, {Component} from 'react';
import L from 'leaflet';


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: [47.79385, 1.79507],
            addresses: []
        };
    }

    componentDidMount() {
        let myMap = L.map('mapid').setView([47.89385, 1.89507], 16);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap);

        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({coordinates: [position.coords.latitude, position.coords.longitude]});
            L.marker(this.state.coordinates).addTo(myMap)
                .bindPopup('Wild Code School')
                .openPopup();
        });
        myMap.on('click', e=>this.onMapClick(e,this, myMap));

    }


    onMapClick(e, t, map) {
        const coords = [e.latlng.lat, e.latlng.lng];
        const addresses = t.state.addresses;
        addresses.push([coords.lng, coords.lat]);
        t.setState({addresses});
        L.marker([coords[0], coords[1]]).addTo(map);
        localStorage.setItem('gps', [coords[0], coords[1]]);
    }


    render() {
        return (
            <div className="map">
                <div id="mapid" className="leaflet row"></div>
            </div>
        );
    }
}

export default Map;
