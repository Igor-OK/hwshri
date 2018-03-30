import * as React from 'react';

import {Scroll} from '../Scroll/Scroll';
import {Card} from '../Card/Card';
import {Dashboard} from '../Dashboard/Dashboard';


export class Grid extends React.Component {
    
    state = {
        justNumbersAndSrc:[],
        open: false,
        current: 0,
    };
    
    constructor(props) {
        super(props);
        this.imageClick = this.imageClick.bind(this); 
        this.closeIt = this.closeIt.bind(this); 
        this.nextImage = this.nextImage.bind(this); 
        this.previousImage = this.previousImage.bind(this); 
    }

    imageClick(param, e){
        console.log(param);
        console.log(e.target);
        this.setState({open: true,
                       current: param});
    }

    closeIt(){
        this.setState({open: false});
    }

    nextImage(){
        let now = this.state.current;
        if (now === this.props.Items.length){
            console.log('FETCH IT !!!') //-----не забудь тут вызывать и может вообще их поглубже засунуть??
        }
        this.setState({current:++now})
    }

    previousImage(){
        let now = this.state.current;
        if (now === 0){
            now = this.props.Items.length;
        }
        this.setState({current:--now});
    }

    render(){
            if(!this.props.Items){
                return null
            }

            return(  
                <Scroll 
                    Cols={this.props.Cols} 
                    Coordinate={this.props.Coordinate} 
                    FetchMore={this.props.FetchMore}>

                    {
                        this.props.Items.map(card=>
                            <Card 
                                key={card._id}
                                Item={card} 
                                OnClick={this.imageClick.bind(this, card.num)}/>
                        ) 
                    }

                    <Dashboard 
                        Items={this.props.Items}
                        Opened={this.state.open} 
                        Current={this.state.current} 
                        CloseIt={this.closeIt}
                        Next={this.nextImage.bind(this)}
                        Previous={this.previousImage}
                    />
                </Scroll>
        );
    }

}