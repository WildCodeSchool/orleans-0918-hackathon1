import React, {Component} from 'react';
import Candy from './Candy';

class Candies extends Component {

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        candies: [],
        calories: 0
    };

    componentDidMount() {
        fetch('https://fr-en.openfoodfacts.org/category/candies/1.json')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    candies: data.products
                });

            })
    }

    handleClick(candy, event) {
        let calories = this.state.calories+parseInt(candy.nutriments.energy_value);
        this.setState({calories});
        console.log(calories);
        // this.setState(state => ({
        //     isToggleOn: !state.isToggleOn,
        //     gps: !this.state.isToggleOn ? localStorage.getItem('gps') : 0,
        //     calories
        // }));
    }

    render() {
        const candiesList = this.state.candies.map(candy =>
            <Candy handleClick={(e) => this.handleClick(candy, e)} active="false" key={Math.random()} name={candy.product_name}
                   cal={candy.nutriments.energy_value}
                   src={candy.image_front_small_url}>
            </Candy>
        );

        return (
            <div className="row candies">
                <div>cal: {this.state.calories}</div>
                {candiesList}
            </div>
        );
    }
}

export default Candies;
