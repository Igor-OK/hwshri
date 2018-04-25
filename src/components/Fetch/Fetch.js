import * as React from 'react';

import {Columns} from '../Columns/Columns';



export class Fetch extends React.Component {

    state = {
        loading: true,
        cards: [],
        step: 1
    };

    constructor(props) {
        super(props);

        this.fetchMore = this.fetchMore.bind(this); 
    }

    componentDidMount() {
        this.fetchMore()
            .catch((error) => {
                this.setState({
                    loading: false,
                    error
                });
            });
    }  
 
    async fetchMore(){
        let num = this.state.step;
        let param = '/hwshri/data' + num + '.json';
        let response = await fetch(param);
        let json = await response.json();
        let jsonClean = json && json.data && json.data.result && json.data.result.items;
        num++;
        if (num === 6) num = 1; // пока зациклю на мои 5 json файлов
        this.setState({
            cards: this.state.cards.concat(jsonClean),
            loading: false,
            step: num
            });  
    } 
    
    render() {
        if (this.state.loading) {
            return (
                <div className="spiner">
                   загрузка...
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
                <Columns 
                    Items={this.state.cards}
                    FetchMore={this.fetchMore}
                />
        );
    }

}

