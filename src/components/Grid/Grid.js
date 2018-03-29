import * as React from 'react';
import {Scroll} from '../Scroll/Scroll';
import {Card} from '../Card/Card';

export function Grid ({Items, Cols, Coordinate, FetchMore}){

if(!Items){
    return null
}

    return(  
            <Scroll Cols={Cols} Coordinate={Coordinate} FetchMore={FetchMore}>
            {
                Items.map(card=>
                    <Card Item={card} />
                ) 
            }
            </Scroll>
    );
}