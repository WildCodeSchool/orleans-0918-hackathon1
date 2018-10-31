import React, {Component} from 'react';
import L from 'leaflet';


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: [47.79385, 1.79507]
        };
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick() {
        const gps = Math.random() * 100;
        localStorage.setItem('gps', gps);
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({coordinates: [position.coords.latitude, position.coords.longitude]});
            L.marker(this.state.coordinates).addTo(myMap)
                .bindPopup('Wild Code School')
                .openPopup();
        }

    );

        let myMap = L.map('mapid').setView([47.89385, 1.89507], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap);

        L.marker(this.state.coordinates).addTo(myMap)
            .bindPopup('Wild Code School')
            .openPopup();

        myMap.on('click', this.onMapClick);
    }

    onMapClick(e) {
        const coords = e.latlng;
        this.setState({coordinates: [coords.lng, coords.lat]});
        // get address from gps coords
        //  fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${coords.lng}&lat=${coords.lat}&type=street`)
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({'coordinates'})
        //     })

    }

    handleSubmit(e) {
        e.preventDefault();

        fetch('https://api-adresse.data.gouv.fr/search/?q=2+rue+du+bois+girault+orl%C3%A9ans&type=street')
            .then(response => response.json())
            .then(data => {
                console.log(this.state.coordinates)
                this.setState({coordinates: [data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]]})

                console.log(this.state.coordinates)
            })
    }

    render() {
        return (
            <div className="map">
                <form onSubmit={e => this.handleSubmit(e)}>
                    <div className="address">
                        <input type="text" id="address" name="address" placeholder="1, allée du champ de mars"/>
                    </div>
                </form>
                <div id="mapid" className="leaflet row"></div>
                <button onClick={this.handleClick}>GPS random</button>
            </div>
        );
    }
}

export default Map;
