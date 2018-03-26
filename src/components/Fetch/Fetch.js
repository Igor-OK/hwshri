import * as React from 'react';

import {Columns} from '../Columns/Columns';



export class Fetch extends React.Component {

    state = {
        loading: true,
        cards: [],
    };

    constructor(props) {
        super(props);
        // this.fetchData = this.fetchData.bind(this);
        // this.fetchNext = this.fetchNext.bind(this);
        // this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        this.fetchData()
            .catch((error) => {
                this.setState({
                    loading: false,
                    error
                });
            });
    }

    
    async fetchData(){
        // let response = await fetch('https://cors-anywhere.herokuapp.com/https://api.qwant.com/api/search/images?count=100&offset=1&q=cars', {
        //     method: 'GET'
        let response = await fetch('../data.json');
        // });
        let json = await response.json();
        json.data.result.items.map(item=>item.top = 1);
        this.setState({
            cards: this.state.cards.concat(json.data.result.items),
            loading: false
            });
        console.log(this.state.cards);  
    }


    render() {
        if (this.state.loading) {
            return (
                <div className="spiner">
                    {this.state.cards.map( card =>
                        <h3> {card.height} </h3>
                    )}
                    <div className="size"/>
                </div>
            );
        }

        if (this.state.error) {
            return (
                <div className="screen">
                    <h1>ERROR: {this.state.error.message}</h1>
                </div>
            );
        }

        return (
                <Columns Items={this.state.cards}/>
        );
    }


}
