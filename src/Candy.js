import React, {Component} from 'react';


class Candy extends Component {
    state = {
        gps:0
    };
    render() {

        return (
            <div onClick={this.props.handleClick} className="col-6">
                <div className={`candy card ${this.props.active  ? 'card-on' : 'card-off'}`}>
                    <img className="card-img-top" src={this.props.src} alt={this.props.name}/>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className="card-text">{this.props.cal}Kcal</p>
                        <p className="card-text">{this.props.active === true ? localStorage.getItem('gps') : 0}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Candy;
