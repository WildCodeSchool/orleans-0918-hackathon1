import React, {Component} from 'react';


class Candy extends Component {
    state = {
        address : 'not found',
        zombieClass : "zombie zombie-on"
    }

    getAddress(coords) {
        if (coords) {
            const coordsTab = coords.split(',');
            fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${coordsTab[1]}&lat=${coordsTab[0]}&type=street`)
                .then(response => response.json())
                .then(data => {
                    this.setState({address : data.features[0].properties.label});
                })
        }
    }

    componentDidMount() {
        this.getAddress(this.props.active);
        this.setState({zombieClass:""});
    }

    render() {
        return (
            <div onClick={this.props.handleClick} className="candy col-12">
                <img className={this.props.active ? "zombie zombie-on":"zombie"} src="./zombie.png" alt="zombie"/>
                <div className={` card ${this.props.active  ? 'card-on' : 'card-off'}`}>
                    <img className="card-img-top" src={this.props.src} alt={this.props.name}/>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className="card-text">{this.props.cal}Kcal</p>
                        <p className="card-text">{this.props.active !== 0 ? this.state.address : 0}</p>
                    </div>
                </div>
            </div>

        );
    }
}

export default Candy;
