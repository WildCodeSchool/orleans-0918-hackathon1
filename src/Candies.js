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
        victory: false
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
                    return actives.push(0);
                })
                this.setState({
                    actives
                });
            })
    }

    handleClick(i, candy) {
        const actives = this.state.actives;
        actives[i] = actives[i] ? 0 : localStorage.getItem('gps');

        let cal = 0;
        if (actives[i]) {
            cal = parseInt(candy.nutriments.energy_value ? candy.nutriments.energy_value : 0);
        } else {
            cal = -parseInt(candy.nutriments.energy_value ? candy.nutriments.energy_value : 0);
        }
        let calories = this.state.calories + cal;

        this.setState({
            calories,
            actives,
        });

        if (this.checkAllActivate()) {
            this.setState({victory: true});
        }
    }


    checkAllActivate() {
        const actives = this.state.actives.filter(a => a);
        return actives.length === this.state.candies.length;
    }

    render() {
        const candiesList = this.state.candies.map((candy, i) => {
                return <Candy handleClick={(e) => this.handleClick(i, candy)}
                              active={this.state.actives[i]}
                              key={Math.random()}
                              name={candy.product_name}
                              cal={typeof(candy.nutriments.energy_value) !== 'undefined' ? candy.nutriments.energy_value : 0}
                              src={candy.image_front_small_url}
                >
                </Candy>
            }
        );

        return (
            <div className={this.state.victory ? 'victory' : ''}>
                <iframe className="explosion" src="https://giphy.com/embed/a8KNLfqsqm2qY" width="100%" height="100%"
                        frameBorder="0" allowFullScreen></iframe>
                <div className="row">
                    <div className="calories">
                        <img width={`${this.state.calories / 50}px`} src="./pumpkin.png" alt="citrouille"/>
                        <span className="badge badge-warning">{this.state.calories}Kcal</span>
                    </div>
                </div>
                <div className="row">
                    {candiesList}
                </div>
            </div>
        );
    }
}

export default Candies;
