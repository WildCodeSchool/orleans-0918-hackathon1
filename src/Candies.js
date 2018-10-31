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
        calories: 0,
        actives: [],
    };

    componentDidMount() {
        fetch('https://fr-en.openfoodfacts.org/category/candies/1.json')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    candies: data.products,
                });
                const actives = [];
                this.state.candies.map((candy) => {
                    return actives.push(false);
                })
                this.setState({
                    actives
                });
            })
    }

    handleClick(i, candy) {
        const actives = this.state.actives;
        actives[i] = !actives[i];
        let cal = 0;
        if (actives[i]) {
            cal = parseInt(candy.nutriments.energy_value);
        } else {
            cal = -parseInt(candy.nutriments.energy_value);
        }
        let calories = this.state.calories + cal;

        this.setState({
            calories,
            actives,
        });

        if (this.checkAllActivate()) {
            console.log('victory');
        }
    }


    checkAllActivate() {
        const actives = this.state.actives.filter(a=>a);
        return actives.length === this.state.candies.length;
    }
    render() {
        const candiesList = this.state.candies.map((candy, i) => {

                return <Candy handleClick={(e) => this.handleClick(i, candy)}
                              active={this.state.actives[i]}
                              key={Math.random()}
                              name={candy.product_name}
                              cal={candy.nutriments.energy_value}
                              src={candy.image_front_small_url}
                >
                </Candy>
            }
        );

        return (
            <div className="candies">
                <div className="row">
                <div>Total calories : {this.state.calories} Kcal</div>
                </div>
                <div className="row">
                    {candiesList}
                </div>
            </div>
        );
    }
}

export default Candies;
